const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ✅ CREATE
router.post("/", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const newApp = new Appointment(req.body);

    const saved = await newApp.save();   // ✅ THIS SAVES TO DB

    console.log("Saved to DB:", saved);  // ✅ CONFIRMATION

    res.json({ message: "Booked successfully" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE STATUS (FIXED)
router.put("/:id", async (req, res) => {
  try {
    console.log("PUT CALLED");              // 👈 DEBUG
    console.log("ID:", req.params.id);      // 👈 DEBUG
    console.log("STATUS:", req.body.status);// 👈 DEBUG

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("PUT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;