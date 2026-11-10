const env = require("../config/env");

/**
 * Pluggable SMS sender. In dev (SMS_PROVIDER=console) the OTP is printed to the server log.
 * To go live, add a provider below (MSG91 shown) and set SMS_PROVIDER + credentials in .env.
 * Indian OTP SMS must use a DLT-registered template – set MSG91_TEMPLATE_ID accordingly.
 */
async function sendOtpSms(phone, code, countryCode = "+91") {
  if (env.sms.provider === "msg91") {
    const res = await fetch("https://control.msg91.com/api/v5/otp", {
      method: "POST",
      headers: { authkey: env.msg91.authKey, "content-type": "application/json" },
      body: JSON.stringify({
        template_id: env.msg91.templateId,
        mobile: `${countryCode.replace("+", "")}${phone}`,
        otp: code
      })
    });
    if (!res.ok) throw new Error(`MSG91 responded ${res.status}`);
    return;
  }
  console.log(`[sms:console] OTP for ${countryCode}${phone}: ${code}`);
}

module.exports = { sendOtpSms };
