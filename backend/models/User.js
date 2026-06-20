const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  campus: String,
  trustScore: { type: Number, default: 0 },
  isVerified: Boolean,
  phone: String,
  skills: [String],
  cgpa: Number,
  region: String,
  isAvailableForTeam: Boolean,
  role: { type: String, default: "user" },
  verificationTier: {
    type: String,
    enum: ["none", "campus_student", "verified_student", "verified_pro"],
    default: "none"
  },
  trustScoreHistory: [{
    points: Number,
    reason: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model("User", userSchema);