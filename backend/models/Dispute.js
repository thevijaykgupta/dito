const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema({
  transaction: {
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
  reason: {
    type: String,
    enum: [
      "not-as-described",
      "didnt-arrive",
      "broken-defective",
      "other"
    ],
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  evidence: [String], // Image URLs
  sellerResponse: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ["opened", "awaiting-seller", "resolved", "inconclusive"],
    default: "opened"
  },
  resolution: {
    type: String,
    enum: ["favor-buyer", "favor-seller", "inconclusive"],
    default: null
  },
  adminNote: {
    type: String
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  resolvedAt: {
    type: Date
  },
  closedAt: {
    type: Date
  }
}, {
  timestamps: true
});

disputeSchema.index({ buyer: 1 });
disputeSchema.index({ seller: 1 });
disputeSchema.index({ status: 1 });

module.exports = mongoose.model("Dispute", disputeSchema);