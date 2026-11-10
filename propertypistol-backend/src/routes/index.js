const router = require("express").Router();

router.get("/health", (_req, res) => res.json({ success: true, status: "ok", uptime: process.uptime() }));
router.use("/auth", require("./auth"));
router.use("/leads", require("./leads"));
router.use("/me", require("./me"));
router.use("/property-submissions", require("./submissions"));
router.use("/tools", require("./tools"));
router.use("/admin", require("./admin"));
router.use("/", require("./catalog"));
router.use("/", require("./content"));

module.exports = router;
