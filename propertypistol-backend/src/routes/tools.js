const router = require("express").Router();
const { z } = require("zod");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { emi, eligibility, convertArea, AREA_UNITS } = require("../services/calculators");
const { recommend } = require("../services/ai");

router.post("/emi", validate({ body: z.object({ principal: z.coerce.number().positive().max(1e10), ratePct: z.coerce.number().min(0).max(40), years: z.coerce.number().min(0.5).max(40) }) }),
  (req, res) => res.json({ success: true, ...emi(req.body) }));

router.post("/loan-eligibility", validate({ body: z.object({ monthlyIncome: z.coerce.number().positive(), otherEmis: z.coerce.number().min(0).default(0), ratePct: z.coerce.number().min(0).max(40), years: z.coerce.number().min(1).max(40), foir: z.coerce.number().min(0.2).max(0.7).default(0.5) }) }),
  (req, res) => res.json({ success: true, ...eligibility(req.body) }));

router.get("/unit-convert", validate({ query: z.object({ value: z.coerce.number(), from: z.enum(Object.keys(AREA_UNITS)), to: z.enum(Object.keys(AREA_UNITS)) }) }),
  (req, res) => res.json({ success: true, value: req.query.value, from: req.query.from, to: req.query.to, result: convertArea(req.query.value, req.query.from, req.query.to) }));

// Aura AI / Piston AI assistant – natural-language property matching (rule-based, no external LLM needed)
router.post("/ai/chat", validate({ body: z.object({ message: z.string().trim().min(2).max(500) }) }),
  asyncHandler(async (req, res) => res.json({ success: true, ...(await recommend(req.body.message)) })));

module.exports = router;
