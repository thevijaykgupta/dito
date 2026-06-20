const Offer = require("../models/Offer");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Create an offer (buyer)
exports.createOffer = async (req, res) => {
  try {
    const { listingId, offerPrice, message } = req.body;
    const listing = await Listing.findById(listingId).populate("seller");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check for existing pending offer from same buyer
    const existingOffer = await Offer.findOne({
      listing: listingId,
      buyer: req.user.id,
      status: "pending"
    });

    if (existingOffer) {
      return res.status(400).json({ message: "You already have a pending offer" });
    }

    const offer = await Offer.create({
      listing: listingId,
      buyer: req.user.id,
      seller: listing.seller._id,
      originalPrice: listing.price,
      offerPrice,
      message
    });

    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Counter offer (seller)
exports.counterOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { counterPrice, message } = req.body;

    const offer = await Offer.findById(offerId);

    if (!offer || String(offer.seller) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    offer.counterPrice = counterPrice;
    offer.counterMessage = message;
    offer.status = "countered";
    offer.round += 1;
    await offer.save();

    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Accept offer (seller accepts buyer's offer or buyer accepts counter)
exports.acceptOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Anyone can accept - seller accepts buyer offer, buyer accepts counter
    offer.status = "accepted";
    await offer.save();

    // Update listing status
    await Listing.findByIdAndUpdate(offer.listing, {
      status: "sold",
      soldCount: { $inc: 1 }
    });

    // Update trust score
    await User.findByIdAndUpdate(offer.seller, {
      $inc: { trustScore: 2 }
    });

    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Reject offer
exports.rejectOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.status = "rejected";
    await offer.save();

    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get offers for a listing
exports.getListingOffers = async (req, res) => {
  try {
    const { listingId } = req.params;
    const offers = await Offer.find({ listing: listingId })
      .populate("buyer", "name avatar")
      .populate("seller", "name avatar")
      .sort({ createdAt: -1 });

    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's offers
exports.getUserOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      $or: [{ buyer: req.user.id }, { seller: req.user.id }]
    })
      .populate("buyer", "name avatar")
      .populate("seller", "name avatar")
      .populate("listing", "title price images")
      .sort({ createdAt: -1 });

    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Expire old offers (cron job)
exports.expireOldOffers = async () => {
  try {
    const result = await Offer.updateMany(
      {
        status: "pending",
        createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      },
      { status: "expired" }
    );

    return result.modifiedCount;
  } catch (err) {
    console.error("Error expiring offers:", err);
    return 0;
  }
};