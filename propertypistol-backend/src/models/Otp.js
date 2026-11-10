const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  phone: { type: String, required: true, index: true },
  codeHash: { type: String, required: true },
  purpose: { type: String, enum: ["login", "verify"], default: "login" },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }, // Mongo TTL cleanup
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("Otp", otpSchema);
