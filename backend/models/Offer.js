const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  offerPrice: {
    type: Number,
    required: true
  },
  round: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "countered", "expired"],
    default: "pending"
  },
  counterPrice: {
    type: Number,
    default: null
  },
  counterMessage: {
    type: String,
    default: null
  },
  message: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

offerSchema.index({ listing: 1 });
offerSchema.index({ buyer: 1 });
offerSchema.index({ seller: 1 });
offerSchema.index({ status: 1 });

module.exports = mongoose.model("Offer", offerSchema);