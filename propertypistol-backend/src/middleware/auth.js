const jwt = require("jsonwebtoken");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

const readToken = (req) => {
  const h = req.headers.authorization || "";
  return h.startsWith("Bearer ") ? h.slice(7) : null;
};

async function loadUser(req) {
  const token = readToken(req);
  if (!token) return null;
  let payload;
  try {
    payload = jwt.verify(token, env.jwtAccessSecret);
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }
  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) throw ApiError.unauthorized("Account not found or disabled");
  return user;
}

/** Requires a valid access token. */
const requireAuth = async (req, _res, next) => {
  try {
    const user = await loadUser(req);
    if (!user) throw ApiError.unauthorized();
    req.user = user;
    next();
  } catch (e) { next(e); }
};

/** Attaches req.user when a valid token is present, but never blocks anonymous traffic. */
const optionalAuth = async (req, _res, next) => {
  try {
    req.user = (await loadUser(req)) || null;
    next();
  } catch (e) { next(e); }
};

const requireRole = (...roles) => (req, _res, next) =>
  roles.includes(req.user?.role) ? next() : next(ApiError.forbidden());

module.exports = { requireAuth, optionalAuth, requireRole };
