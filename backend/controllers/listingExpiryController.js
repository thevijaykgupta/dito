const Listing = require("../models/Listing");

// Set listing expiry (admin/manual)
exports.updateExpiry = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { expiryDays } = req.body;

    const expiryDate = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    const listing = await Listing.findByIdAndUpdate(listingId, {
      expiresAt: expiryDate
    }, { new: true });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Renew listing (extend expiry)
exports.renewListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Extend by 45 days
    listing.expiresAt = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);
    listing.renewals = (listing.renewals || 0) + 1;
    await listing.save();

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Reactivate listing
exports.reactivateListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    listing.status = "active";
    listing.expiresAt = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);
    await listing.save();

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Expire old listings (cron job)
exports.expireOldListings = async (req, res) => {
  try {
    const result = await Listing.updateMany(
      {
        expiresAt: { $lt: new Date() },
        status: "active"
      },
      { status: "expired" }
    );

    const message = `Expired ${result.modifiedCount} listings`;
    res.json({ message });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get expiring soon listings
exports.getExpiringListings = async (req, res) => {
  try {
    const expiring = await Listing.find({
      seller: req.user.id,
      expiresAt: {
        $gt: new Date(),
        $lt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      status: "active"
    });

    res.json(expiring);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};