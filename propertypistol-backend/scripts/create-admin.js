/**
 * Creates (or promotes) an admin/agent account.
 *   node scripts/create-admin.js you@example.com 'StrongPassw0rd!' "Your Name" [admin|agent]
 * Agents are added to the lead round-robin pool automatically.
 */
const { connectDb, mongoose } = require("../src/config/db");
const User = require("../src/models/User");

(async () => {
  const [email, password, name = "Admin", role = "admin"] = process.argv.slice(2);
  if (!email || !password || password.length < 8) {
    console.error("Usage: node scripts/create-admin.js <email> <password (8+ chars)> [name] [admin|agent]");
    process.exit(1);
  }
  if (!["admin", "agent"].includes(role)) throw new Error("role must be admin or agent");
  await connectDb();
  const user = (await User.findOne({ email: email.toLowerCase() })) || new User({ email: email.toLowerCase() });
  user.name = name; user.role = role; user.isActive = true; user.acceptsLeads = true; user.emailVerified = true;
  await user.setPassword(password);
  await user.save();
  console.log(`[admin] ${role} ready: ${user.email}`);
  await mongoose.disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });
