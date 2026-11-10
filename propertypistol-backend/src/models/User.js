const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const refreshTokenSchema = new Schema(
  { tokenHash: String, expiresAt: Date, userAgent: String, createdAt: { type: Date, default: Date.now } },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, trim: true, maxlength: 120 },
    email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true }, // normalized 10-digit (India) or digits-only
    countryCode: { type: String, default: "+91" },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ["user", "agent", "admin"], default: "user", index: true },
    isActive: { type: Boolean, default: true },
    phoneVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    // Wishlist stores project slugs (stable across re-seeds; matches the frontend's slug-based routing)
    wishlist: { type: [String], default: [] },
    preferredCity: { type: String, default: "mumbai" },
    // Sales team capacity: only agents with acceptsLeads are in the round-robin pool
    acceptsLeads: { type: Boolean, default: false },
    refreshTokens: { type: [refreshTokenSchema], select: false, default: [] },
    lastLoginAt: Date
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, 12);
};
userSchema.methods.checkPassword = function (plain) {
  return this.passwordHash ? bcrypt.compare(plain, this.passwordHash) : Promise.resolve(false);
};
userSchema.methods.toPublic = function () {
  return {
    id: this._id, name: this.name, email: this.email, phone: this.phone, role: this.role,
    phoneVerified: this.phoneVerified, preferredCity: this.preferredCity, wishlistCount: this.wishlist.length
  };
};

module.exports = model("User", userSchema);
