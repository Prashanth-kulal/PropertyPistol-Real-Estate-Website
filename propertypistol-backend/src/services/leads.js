const crypto = require("crypto");
const env = require("../config/env");
const Lead = require("../models/Lead");
const User = require("../models/User");
const { sendMail } = require("./mailer");

const reference = () => {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `PP-L-${d}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
};

/** Least-loaded round robin across active agents who accept leads (open leads = not won/lost/spam). */
async function pickAgent() {
  const agents = await User.find({ role: { $in: ["agent", "admin"] }, isActive: true, acceptsLeads: true }).select("_id name email");
  if (!agents.length) return null;
  const load = await Lead.aggregate([
    { $match: { assignedTo: { $in: agents.map((a) => a._id) }, status: { $nin: ["won", "lost", "spam"] } } },
    { $group: { _id: "$assignedTo", open: { $sum: 1 }, last: { $max: "$assignedAt" } } }
  ]);
  const byId = Object.fromEntries(load.map((l) => [String(l._id), l]));
  agents.sort((a, b) => {
    const la = byId[String(a._id)] || { open: 0, last: 0 }, lb = byId[String(b._id)] || { open: 0, last: 0 };
    return la.open - lb.open || new Date(la.last || 0) - new Date(lb.last || 0);
  });
  return agents[0];
}

/**
 * Lead intake pipeline:
 *  1. dedupe  – same phone + type + project within LEAD_DEDUPE_HOURS appends a note instead of a new lead
 *  2. persist – store with attribution (page, UTM, ip, user agent)
 *  3. assign  – least-loaded agent
 *  4. notify  – email the assignee/sales inbox and acknowledge the customer (async, non-blocking)
 */
async function createLead(data, ctx = {}) {
  const since = new Date(Date.now() - env.leadDedupeHours * 3600_000);
  const existing = await Lead.findOne({
    phone: data.phone, type: data.type, projectSlug: data.projectSlug || null, createdAt: { $gte: since }
  });
  if (existing) {
    existing.notes.push({ text: "Customer submitted the form again.", byName: "system" });
    await existing.save();
    return { lead: existing, duplicate: true };
  }

  const agent = await pickAgent();
  const lead = await Lead.create({
    ...data,
    projectSlug: data.projectSlug || undefined,
    reference: reference(),
    user: ctx.user?._id,
    assignedTo: agent?._id,
    assignedAt: agent ? new Date() : undefined,
    source: { ...(data.source || {}), ip: ctx.ip, userAgent: ctx.userAgent }
  });

  const summary = `${lead.type} lead ${lead.reference}\nName: ${lead.name}\nPhone: ${lead.countryCode}${lead.phone}\nEmail: ${lead.email || "-"}\nCity: ${lead.city || "-"}\nProject: ${lead.projectName || "-"}`;
  sendMail({ to: agent?.email || env.mail.salesInbox, subject: `New ${lead.type} lead: ${lead.name}`, text: summary });
  if (lead.email) {
    sendMail({
      to: lead.email,
      subject: "We received your request – PropertyPistol",
      text: `Hi ${lead.name},\n\nThanks for reaching out. A property advisor will call you within 15 minutes during working hours.\nYour reference: ${lead.reference}\n`
    });
  }
  return { lead, duplicate: false };
}

module.exports = { createLead, pickAgent, reference };
