require("dotenv").config({ quiet: true });

const required = (name, fallback) => {
  const v = process.env[name] || fallback; // `||` so an empty `KEY=` line in .env counts as unset
  if (v === undefined) throw new Error(`Missing required env var ${name}`);
  return v;
};

const isProd = process.env.NODE_ENV === "production";

const env = {
  isProd,
  port: Number(process.env.PORT || 5000),
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/propertypistol"),
  // In production secrets MUST be provided; in dev we fall back to obvious placeholders.
  jwtAccessSecret: required("JWT_ACCESS_SECRET", isProd ? undefined : "dev-access-secret-change-me"),
  jwtRefreshSecret: required("JWT_REFRESH_SECRET", isProd ? undefined : "dev-refresh-secret-change-me"),
  accessTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTtlDays: Number(process.env.REFRESH_TOKEN_TTL_DAYS || 30),
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:3000").split(",").map((s) => s.trim()),
  otp: {
    length: 4, // frontend login page asks for a 4-digit code
    ttlMinutes: Number(process.env.OTP_TTL_MINUTES || 5),
    maxAttempts: 5,
    resendCooldownSeconds: 30
  },
  sms: { provider: process.env.SMS_PROVIDER || "console" }, // console | msg91 (see services/sms.js)
  msg91: { authKey: process.env.MSG91_AUTH_KEY, templateId: process.env.MSG91_TEMPLATE_ID },
  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || "PropertyPistol <no-reply@localhost>",
    salesInbox: process.env.SALES_INBOX_EMAIL // new-lead alerts go here
  },
  leadDedupeHours: Number(process.env.LEAD_DEDUPE_HOURS || 24)
};

module.exports = env;
