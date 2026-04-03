const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ msg: "Login working" });
});

router.post("/register", (req, res) => {
  res.json({ msg: "Register working" });
});

module.exports = router;