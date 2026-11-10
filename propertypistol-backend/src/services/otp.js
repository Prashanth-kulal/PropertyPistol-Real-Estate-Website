const env = require("../config/env");
const Otp = require("../models/Otp");
const ApiError = require("../utils/ApiError");
const { sha256, randomDigits } = require("../utils/helpers");
const { sendOtpSms } = require("./sms");

async function requestOtp(phone, countryCode = "+91", purpose = "login") {
  const last = await Otp.findOne({ phone }).sort({ createdAt: -1 });
  if (last && Date.now() - last.createdAt.getTime() < env.otp.resendCooldownSeconds * 1000) {
    throw ApiError.tooMany(`Please wait ${env.otp.resendCooldownSeconds}s before requesting another code`);
  }
  await Otp.deleteMany({ phone }); // only one live code per number
  const code = randomDigits(env.otp.length);
  await Otp.create({ phone, purpose, codeHash: sha256(`${phone}:${code}`), expiresAt: new Date(Date.now() + env.otp.ttlMinutes * 60_000) });
  await sendOtpSms(phone, code, countryCode);
  return { expiresInSeconds: env.otp.ttlMinutes * 60, ...(env.isProd ? {} : { devCode: code }) };
}

async function verifyOtp(phone, code) {
  const rec = await Otp.findOne({ phone }).sort({ createdAt: -1 });
  if (!rec || rec.expiresAt < new Date()) throw ApiError.badRequest("Code expired. Please request a new one.");
  if (rec.attempts >= env.otp.maxAttempts) {
    await rec.deleteOne();
    throw ApiError.tooMany("Too many wrong attempts. Please request a new code.");
  }
  if (rec.codeHash !== sha256(`${phone}:${code}`)) {
    rec.attempts += 1;
    await rec.save();
    throw ApiError.badRequest("Incorrect verification code");
  }
  await rec.deleteOne(); // single use
}

module.exports = { requestOtp, verifyOtp };
