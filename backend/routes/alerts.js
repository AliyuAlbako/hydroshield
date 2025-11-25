const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Subscriber = require("../models/Subscriber");
const { sendSMS } = require("../utils/sms");

// POST /api/send-alert
// body: { state: "Lagos", message: "Custom message" }
router.post("/send-alert", auth, async (req, res) => {
  const { state, message } = req.body;
  if (!state) return res.status(400).json({ message: "state required" });

  const subs = await Subscriber.find({ state });
  if (!subs.length) return res.json({ message: "no subscribers in state", recipients: [] });

  const results = [];
  for (const s of subs) {
    try {
      const r = await sendSMS(s.phone, message || `⚠️ Flood Alert: ${state} is at risk. Please take precautions. - HydroShield`);
      results.push({ phone: s.phone, result: "ok" });
    } catch (err) {
      results.push({ phone: s.phone, result: "failed", error: err.message });
    }
  }

  res.json({ message: "alerts sent", recipients: results });
});

module.exports = router;
