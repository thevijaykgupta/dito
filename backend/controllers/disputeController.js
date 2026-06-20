const Dispute = require("../models/Dispute");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Create a dispute
exports.createDispute = async (req, res) => {
  try {
    const { listingId, reason, description, evidence } = req.body;

    const listing = await Listing.findById(listingId)
      .populate("seller");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const dispute = await Dispute.create({
      transaction: listingId,
      buyer: req.user.id,
      seller: listing.seller._id,
      reason,
      description,
      evidence
    });

    // Add dispute info to chat for visibility
    // This would be handled via socket or chat controller

    res.json(dispute);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's disputes
exports.getUserDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find({
      $or: [
        { buyer: req.user.id },
        { seller: req.user.id }
      ]
    })
      .populate("transaction")
      .populate("buyer", "name avatar")
      .populate("seller", "name avatar")
      .sort({ createdAt: -1 });

    res.json(disputes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Seller responds to dispute
exports.respondToDispute = async (req, res) => {
  try {
    const { disputeId } = req.params;
    const { response } = req.body;

    const dispute = await Dispute.findById(disputeId);

    if (!dispute || String(dispute.seller) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    dispute.sellerResponse = response;
    dispute.status = "awaiting-seller";
    await dispute.save();

    res.json(dispute);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin resolves dispute
exports.resolveDispute = async (req, res) => {
  try {
    const { disputeId } = req.params;
    const { resolution, adminNote } = req.body;

    const dispute = await Dispute.findByIdAndUpdate(
      disputeId,
      {
        resolution,
        adminNote,
        status: "resolved",
        resolvedBy: req.user.id,
        resolvedAt: new Date(),
        closedAt: new Date()
      },
      { new: true }
    );

    // Update trust score if resolved against seller
    if (resolution === "favor-buyer") {
      await User.findByIdAndUpdate(dispute.seller, {
        $inc: { trustScore: -5 }
      });
    }

    res.json(dispute);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all disputes (admin)
exports.getAllDisputes = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const disputes = await Dispute.find(query)
      .populate("transaction")
      .populate("buyer", "name")
      .populate("seller", "name")
      .sort({ createdAt: -1 });

    res.json(disputes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};