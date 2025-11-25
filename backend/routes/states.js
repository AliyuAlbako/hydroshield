const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Risk = require("../models/Risk");

const GEOJSON = path.join(__dirname, "..", "data", "nigeria_states.geojson");

// GET /api/states
router.get("/", async (req, res) => {
  try {
    const raw = fs.readFileSync(GEOJSON, "utf8");
    const geojson = JSON.parse(raw);

    // attach risk levels from DB if present
    const risks = await Risk.find({});
    const riskMap = {};
    risks.forEach(r => riskMap[r.state] = r);

    geojson.features = geojson.features.map(f => {
      const name = f.properties.name || f.properties.NAME_1 || f.properties.shapeName;
      const r = riskMap[name];
      f.properties.risk_level = r ? r.level : "Low";
      f.properties.rainfall_mm = r ? r.rainfall_mm : 0;
      return f;
    });

    res.json(geojson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load states geojson" });
  }
});

module.exports = router;
