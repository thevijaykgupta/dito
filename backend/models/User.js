const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  campus: String,
  isVerified: Boolean,
  skills: [String],
  cgpa: Number,
  region: String,
  isAvailableForTeam: Boolean,
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", userSchema);