const mongoose = require("mongoose");

const listingStatsSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  saves: {
    type: Number,
    default: 0
  },
  offerCount: {
    type: Number,
    default: 0
  },
  messages: {
    type: Number,
    default: 0
  }
});

listingStatsSchema.index({ listing: 1, date: -1 });
listingStatsSchema.index({ date: 1 });

module.exports = mongoose.model("ListingStats", listingStatsSchema);