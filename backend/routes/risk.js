const express = require("express");
const router = express.Router();
const Risk = require("../models/Risk");
const auth = require("../middleware/auth");

// GET /api/flood-risk
router.get("/", async (req, res) => {
  const risks = await Risk.find({});
  const out = {};
  risks.forEach(r => out[r.state] = { level: r.level, rainfall_mm: r.rainfall_mm, updatedAt: r.updatedAt });
  res.json(out);
});

// POST /api/flood-risk/:state  (admin)
router.post("/:state", auth, async (req, res) => {
  const state = req.params.state;
  const { level, rainfall_mm } = req.body;
  let r = await Risk.findOne({ state });
  if (!r) r = new Risk({ state, level, rainfall_mm });
  else { r.level = level || r.level; r.rainfall_mm = rainfall_mm || r.rainfall_mm; r.updatedAt = new Date(); }
  await r.save();
  res.json({ message: "Risk updated", data: r });
});

module.exports = router;
