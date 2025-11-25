const mongoose = require("mongoose");

const RiskSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Low","Medium","High"], default: "Low" },
  rainfall_mm: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Risk", RiskSchema);
