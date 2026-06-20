const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: [
      "new_listing_match",
      "offer_received",
      "offer_accepted",
      "offer_rejected",
      "message_received",
      "transaction_complete",
      "price_drop",
      "system_announcement"
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  },
  savedSearch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SavedSearch"
  },
  read: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);