const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  targetType: {
    type: String,
    enum: ["listing", "user", "message", "event", "notes", "service"],
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  reason: {
    type: String,
    enum: [
      "wrong-category",
      "inaccurate-description",
      "prohibited-item",
      "spam",
      "duplicate",
      "suspicious-seller",
      "scam",
      "abusive-content",
      "harassment",
      "other"
    ],
    required: true
  },
  details: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ["pending", "reviewed", "resolved", "dismissed"],
    default: "pending"
  },
  adminNote: {
    type: String
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

reportSchema.index({ reporter: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Report", reportSchema);