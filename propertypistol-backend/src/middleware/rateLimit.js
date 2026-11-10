const rateLimit = require("express-rate-limit");

const make = (windowMs, limit, message) =>
  rateLimit({ windowMs, limit, standardHeaders: true, legacyHeaders: false, message: { success: false, message } });

module.exports = {
  globalLimiter: make(60_000, 300, "Too many requests, please try again shortly."),
  authLimiter: make(15 * 60_000, 30, "Too many authentication attempts. Try again in a few minutes."),
  otpLimiter: make(60 * 60_000, 10, "Too many OTP requests. Try again later."),
  formLimiter: make(60 * 60_000, 20, "Too many submissions from this network. Try again later.")
};
