const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  date: String,
  patientName: String,
  patientAge: String,
  patientProblem: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);