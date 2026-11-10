const nodemailer = require("nodemailer");
const env = require("../config/env");

let transport = null;
const getTransport = () => {
  if (transport || !env.mail.host) return transport;
  transport = nodemailer.createTransport({
    host: env.mail.host, port: env.mail.port, secure: env.mail.port === 465,
    auth: env.mail.user ? { user: env.mail.user, pass: env.mail.pass } : undefined
  });
  return transport;
};

/** Fire-and-forget: email problems must never fail a user-facing request. */
async function sendMail({ to, subject, text, html }) {
  if (!to) return;
  const t = getTransport();
  if (!t) return console.log(`[mail:console] to=${to} subject="${subject}"\n${text || ""}`);
  try {
    await t.sendMail({ from: env.mail.from, to, subject, text, html });
  } catch (e) {
    console.error("[mail] failed:", e.message);
  }
}

module.exports = { sendMail };
