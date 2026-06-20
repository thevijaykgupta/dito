const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  userId: String,
  skills: [String],
  subjects: [String],
  availability: Boolean,
  region: String,
  cgpa: Number
});

module.exports = mongoose.model("Team", teamSchema);