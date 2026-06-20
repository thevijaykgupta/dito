const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["student_id", "phone", "email", "selfie"],
    required: true
  },
  level: {
    type: String,
    enum: ["campus_student", "verified_student", "verified_pro"],
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  documentUrl: String,
  reviewNote: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reviewedAt: Date
}, {
  timestamps: true
});

verificationSchema.index({ user: 1 });
verificationSchema.index({ status: 1 });
verificationSchema.index({ level: 1 });

module.exports = mongoose.model("Verification", verificationSchema);