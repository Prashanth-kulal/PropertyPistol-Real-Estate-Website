const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const env = require("../config/env");
const { sha256 } = require("../utils/helpers");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const COOKIE = "pp_refresh";
const cookieOpts = () => ({
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? "none" : "lax", // frontend and API usually live on different origins in prod
  path: "/api/auth",
  maxAge: env.refreshTtlDays * 864e5
});

const signAccess = (user) => jwt.sign({ sub: String(user._id), role: user.role }, env.jwtAccessSecret, { expiresIn: env.accessTtl });

/** Issues a fresh access+refresh pair, stores only the refresh token's hash, caps stored sessions at 5. */
async function issueSession(user, req, res) {
  const refreshToken = crypto.randomBytes(48).toString("hex");
  const doc = await User.findById(user._id).select("+refreshTokens");
  const now = Date.now();
  doc.refreshTokens = (doc.refreshTokens || [])
    .filter((t) => t.expiresAt.getTime() > now)
    .slice(-4)
    .concat({ tokenHash: sha256(refreshToken), expiresAt: new Date(now + env.refreshTtlDays * 864e5), userAgent: req.get("user-agent") });
  doc.lastLoginAt = new Date();
  await doc.save();
  res.cookie(COOKIE, refreshToken, cookieOpts());
  return { accessToken: signAccess(doc), refreshToken, user: doc.toPublic() };
}

/** Rotates the refresh token (old one is invalidated). Reuse of a rotated token yields 401. */
async function rotateSession(req, res) {
  const presented = req.cookies?.[COOKIE] || req.body?.refreshToken;
  if (!presented) throw ApiError.unauthorized("Missing refresh token");
  const hash = sha256(presented);
  const user = await User.findOne({ "refreshTokens.tokenHash": hash }).select("+refreshTokens");
  if (!user || !user.isActive) throw ApiError.unauthorized("Invalid refresh token");
  const entry = user.refreshTokens.find((t) => t.tokenHash === hash);
  if (!entry || entry.expiresAt.getTime() < Date.now()) throw ApiError.unauthorized("Refresh token expired");
  user.refreshTokens = user.refreshTokens.filter((t) => t.tokenHash !== hash);
  await user.save();
  return issueSession(user, req, res);
}

async function revokeSession(req, res) {
  const presented = req.cookies?.[COOKIE] || req.body?.refreshToken;
  if (presented) {
    await User.updateOne({ "refreshTokens.tokenHash": sha256(presented) }, { $pull: { refreshTokens: { tokenHash: sha256(presented) } } });
  }
  res.clearCookie(COOKIE, { path: "/api/auth" });
}

module.exports = { issueSession, rotateSession, revokeSession, signAccess };
