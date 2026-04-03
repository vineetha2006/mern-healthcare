const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const Appointment = require("./models/Appointment");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)

// ✅ CONNECT TO ATLAS
mongoose.connect("mongodb+srv://vineetha:vineetha2006@healthcarecluster.1400igr.mongodb.net/healthcare?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// TEST
app.get("/", (req, res) => {
  res.send("Backend working");
});

// ✅ UPDATE APPOINTMENT STATUS
app.put("/api/appointments/:id", async (req, res) => {
  try {
    console.log("PUT CALLED");   // ✅ DEBUG
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    console.log("Updated:", updated);

    res.json(updated);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// ✅ SAVE TO DATABASE
app.post("/api/appointments", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const newAppointment = new Appointment(req.body);

    const saved = await newAppointment.save();

    console.log("Saved to DB:", saved);

    res.json({
      message: "Booked successfully",
      data: saved
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET FROM DATABASE
app.get("/api/appointments", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});