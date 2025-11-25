const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  state: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Subscriber", SubscriberSchema);
