const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviewedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    default: null
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    default: null
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    default: null
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
    default: null
  },
  teamup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ["marketplace", "service", "event", "notes", "teamup"],
    required: true
  }
}, {
  timestamps: true
});

reviewSchema.index({ reviewedUser: 1, type: 1 });
reviewSchema.index({ reviewer: 1 });

module.exports = mongoose.model("Review", reviewSchema);