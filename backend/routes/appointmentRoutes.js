const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ➕ BOOK APPOINTMENT (POST)
router.post("/", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 GET ALL APPOINTMENTS (THIS IS YOUR CODE)
router.get("/", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;