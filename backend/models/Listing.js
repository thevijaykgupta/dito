const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  images: [String],

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  campus: {
    type: String,
    default: "RVCE",
  },

  hostel: {
    type: String,
    default: "",
  },

  condition: {
    type: String,
    enum: [
      "Brand New",
      "Like New",
      "Good",
      "Fair",
      "Used"
    ],
    default: "Good",
  },

  views: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  },

  negotiable: {
    type: Boolean,
    default: false,
  },

  featured: {
    type: Boolean,
    default: false,
  },

  urgent: {
    type: Boolean,
    default: false,
  },

  deliveryAvailable: {
    type: Boolean,
    default: false,
  },

  soldCount: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["active", "sold", "hidden", "expired", "rented"],
    default: "active",
  },
  buyerConfirmed: {
    type: Boolean,
    default: false
  },
  buyerConfirmedAt: {
    type: Date
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
  },
  renewals: {
    type: Number,
    default: 0
  },
  // Rental availability
  availableDates: [{
    date: Date,
    blocked: { type: Boolean, default: false }
  }],
  rentalCalendar: [{
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["available", "requested", "booked"],
      default: "available"
    }
  }]
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Listing", listingSchema);