const mongoose = require("mongoose");

const savedSearchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  query: {
    type: String,
    required: true
  },
  filters: {
    categories: [String],
    priceRange: {
      min: Number,
      max: Number
    },
    conditions: [String],
    hostels: [String],
    listingTypes: [String],
    verifiedOnly: Boolean,
    minTrustScore: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  lastMatched: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

savedSearchSchema.index({ user: 1, query: 1 });

module.exports = mongoose.model("SavedSearch", savedSearchSchema);