const express = require("express");
const router = express.Router();
const sendSMS = require("../utils/sms");

// TEST ROUTE TO SEND SMS
router.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "phone and message are required" });
    }

    try {
        const response = await sendSMS(phone, message);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ error: "Failed to send SMS", details: error });
    }
});

module.exports = router;
