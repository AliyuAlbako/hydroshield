const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// POST /api/subscribe
router.post("/", async (req, res) => {
  const { phone, state } = req.body;
  if (!phone || !state) return res.status(400).json({ message: "phone and state required" });
  const sub = new Subscriber({ phone, state });
  await sub.save();
  res.json({ message: "Subscribed", data: sub });
});

module.exports = router;
