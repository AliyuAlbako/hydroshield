require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/hydroshield");

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/states", require("./routes/states"));
app.use("/api/flood-risk", require("./routes/risk"));
app.use("/api/subscribe", require("./routes/subscribe"));
// app.use("/api", require("./routes/alerts"));
app.use("/api/alerts", require("./routes/alerts"));


// health
app.get("/", (req, res) => res.send("HydroShield API running"));

// static data route for map asset - serve uploaded local file if needed
// Note: during deploy change this to a static hosting or S3. Using local file path from dev.
app.get("/assets/nigeria-map.png", (req, res) => {
  // Path to uploaded map image (convert path to URL when packaging)
  res.sendFile(path.resolve("/mnt/data/A_2D_digital_map_displays_Nigeria,_divided_into_36.png"));
});

app.listen(PORT, () => console.log(`HydroShield API listening on ${PORT}`));
