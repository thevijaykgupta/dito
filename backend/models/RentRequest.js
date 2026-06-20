const mongoose = require("mongoose");

const rentRequestSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "rejected", "cancelled", "completed"],
    default: "requested"
  },
  message: {
    type: String,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

rentRequestSchema.index({ listing: 1 });
rentRequestSchema.index({ renter: 1 });
rentRequestSchema.index({ owner: 1 });
rentRequestSchema.index({ status: 1 });

module.exports = mongoose.model("RentRequest", rentRequestSchema);