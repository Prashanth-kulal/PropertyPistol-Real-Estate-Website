const router = require("express").Router();
const { z } = require("zod");
const User = require("../models/User");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { requireAuth } = require("../middleware/auth");
const { authLimiter, otpLimiter } = require("../middleware/rateLimit");
const { normalizePhone } = require("../utils/helpers");
const { requestOtp, verifyOtp } = require("../services/otp");
const { issueSession, rotateSession, revokeSession } = require("../services/tokens");

const phoneField = z.string().min(1, "Phone number is required").max(20);
const cc = z.string().regex(/^\+\d{1,4}$/).default("+91");
const password = z.string().min(8, "Password must be at least 8 characters").max(100);

// --- Phone OTP (login page default tab) -------------------------------------------------------
router.post("/otp/request", otpLimiter, validate({ body: z.object({ phone: phoneField, countryCode: cc }) }),
  asyncHandler(async (req, res) => {
    const phone = normalizePhone(req.body.phone, req.body.countryCode);
    if (!phone) throw ApiError.badRequest("Please enter a valid 10-digit mobile number.");
    const info = await requestOtp(phone, req.body.countryCode);
    res.json({ success: true, message: "Verification code sent", ...info });
  }));

// Verifies the code; creates the account on first login (sign-up and sign-in are the same step).
router.post("/otp/verify", authLimiter,
  validate({ body: z.object({ phone: phoneField, countryCode: cc, code: z.string().regex(/^\d{4}$/, "Enter the 4-digit code"), name: z.string().trim().max(120).optional() }) }),
  asyncHandler(async (req, res) => {
    const phone = normalizePhone(req.body.phone, req.body.countryCode);
    if (!phone) throw ApiError.badRequest("Invalid phone number");
    await verifyOtp(phone, req.body.code);
    let user = await User.findOne({ phone });
    const isNew = !user;
    if (!user) user = await User.create({ phone, countryCode: req.body.countryCode, name: req.body.name, phoneVerified: true });
    else if (!user.isActive) throw ApiError.forbidden("This account has been disabled");
    else {
      user.phoneVerified = true;
      if (!user.name && req.body.name) user.name = req.body.name;
      await user.save();
    }
    res.status(isNew ? 201 : 200).json({ success: true, isNewUser: isNew, ...(await issueSession(user, req, res)) });
  }));

// --- Email + password ------------------------------------------------------------------------
router.post("/register", authLimiter,
  validate({ body: z.object({ name: z.string().trim().min(1).max(120), email: z.string().email(), password, phone: phoneField.optional() }) }),
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    if (await User.exists({ email })) throw ApiError.conflict("An account with this email already exists");
    const user = new User({ name: req.body.name, email });
    if (req.body.phone) {
      const phone = normalizePhone(req.body.phone);
      if (!phone) throw ApiError.badRequest("Invalid phone number");
      if (await User.exists({ phone })) throw ApiError.conflict("This phone number is already registered");
      user.phone = phone;
    }
    await user.setPassword(req.body.password);
    await user.save();
    res.status(201).json({ success: true, ...(await issueSession(user, req, res)) });
  }));

router.post("/login", authLimiter,
  validate({ body: z.object({ email: z.string().email(), password: z.string().min(1) }) }),
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() }).select("+passwordHash");
    // same message for unknown email / wrong password to avoid account enumeration
    if (!user || !(await user.checkPassword(req.body.password))) throw ApiError.unauthorized("Invalid email or password");
    if (!user.isActive) throw ApiError.forbidden("This account has been disabled");
    res.json({ success: true, ...(await issueSession(user, req, res)) });
  }));

// --- Session management ----------------------------------------------------------------------
router.post("/refresh", asyncHandler(async (req, res) => res.json({ success: true, ...(await rotateSession(req, res)) })));
router.post("/logout", asyncHandler(async (req, res) => { await revokeSession(req, res); res.json({ success: true }); }));

router.get("/me", requireAuth, (req, res) => res.json({ success: true, user: req.user.toPublic() }));

router.patch("/me", requireAuth,
  validate({ body: z.object({ name: z.string().trim().min(1).max(120).optional(), preferredCity: z.string().max(40).optional(), email: z.string().email().optional() }).strict() }),
  asyncHandler(async (req, res) => {
    if (req.body.email && (await User.exists({ email: req.body.email.toLowerCase(), _id: { $ne: req.user._id } }))) throw ApiError.conflict("Email already in use");
    Object.assign(req.user, req.body);
    await req.user.save();
    res.json({ success: true, user: req.user.toPublic() });
  }));

router.post("/password", requireAuth,
  validate({ body: z.object({ currentPassword: z.string().optional(), newPassword: password }) }),
  asyncHandler(async (req, res) => {
    const u = await User.findById(req.user._id).select("+passwordHash +refreshTokens");
    if (u.passwordHash && !(await u.checkPassword(req.body.currentPassword || ""))) throw ApiError.unauthorized("Current password is incorrect");
    await u.setPassword(req.body.newPassword);
    u.refreshTokens = []; // sign out other devices
    await u.save();
    res.json({ success: true, message: "Password updated. Please sign in again on other devices." });
  }));

module.exports = router;
