const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  properties: { type: Object }, // store original properties from geojson
  geometry: { type: Object }    // GeoJSON geometry
});

module.exports = mongoose.model("State", StateSchema);
