const Listing = require("../models/Listing");
const User = require("../models/User");
const NotificationService = require("../services/notificationService");

exports.createListing = async (req, res) => {
  const listing = await Listing.create({
    ...req.body,
    seller: req.user.id
  });

  // Generate notifications for matching saved searches
  const NotificationService = require("../services/notificationService");
  await NotificationService.generateListingNotifications(listing);

  res.json(listing);
};

exports.getListings = async (req, res) => {
  const listings = await Listing.find().populate("seller", "-password");
  res.json(listings);
};

// Buyer confirms transaction completion
exports.confirmTransaction = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if user is buyer (would need chat context - simplified for now)
    listing.buyerConfirmed = true;
    listing.buyerConfirmedAt = new Date();
    await listing.save();

    // Update seller trust score
    await User.findByIdAndUpdate(listing.seller, {
      $inc: { trustScore: 2 }
    });

    res.json({ message: "Transaction confirmed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Mark listing as sold (seller action)
exports.markAsSold = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);

    if (!listing || String(listing.seller) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    listing.status = "sold";
    await listing.save();

    // Update seller trust score
    await User.findByIdAndUpdate(listing.seller, {
      $inc: { trustScore: 2 }
    });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};