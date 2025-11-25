require("dotenv").config();
const connectDB = require("../config/db");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const State = require("../models/State");
const Risk = require("../models/Risk");
const Subscriber = require("../models/Subscriber");
const bcrypt = require("bcryptjs");

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/hydroshield";
connectDB(MONGO);

async function run() {
  try {
    const GEO = path.join(__dirname, "..", "data", "nigeria_states.json");
    const raw = fs.readFileSync(GEO, "utf8");
    const gj = JSON.parse(raw);

    // Clear existing
    await State.deleteMany({});
    await Risk.deleteMany({});
    await Subscriber.deleteMany({});
    await User.deleteMany({});

    // Loop states
    for (const f of gj.features) {
      const name = f.properties.state; // FIXED !!!
      if (!name) {
        console.log("Missing state name in feature:", f);
        continue;
      }

      await State.create({
        name,
        properties: f.properties,
        geometry: f.geometry
      });

      // Random risk for MVP demo
      const level = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];
      await Risk.create({
        state: name,
        level,
        rainfall_mm: Math.round(Math.random() * 120)
      });
    }

    // Create admin
    const pw = "adminpass";
    const hash = await bcrypt.hash(pw, 10);
    await User.create({ username: "admin", passwordHash: hash });

    // One sample subscriber
    await Subscriber.create({ phone: "+2348012345678", state: "Lagos" });

    console.log("Seeding done. Admin user 'admin' password:", pw);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
