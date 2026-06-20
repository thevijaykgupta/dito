const RentRequest = require("../models/RentRequest");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Create a rental request
exports.createRentRequest = async (req, res) => {
  try {
    const { listingId, startDate, endDate, message } = req.body;
    const listing = await Listing.findById(listingId).populate("seller");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if dates are available
    const existingRequests = await RentRequest.find({
      listing: listingId,
      status: { $in: ["requested", "accepted"] }
    });

    const hasConflict = existingRequests.some(req => {
      return (
        (startDate >= req.startDate && startDate <= req.endDate) ||
        (endDate >= req.startDate && endDate <= req.endDate)
      );
    });

    if (hasConflict) {
      return res.status(400).json({ message: "Dates not available" });
    }

    const rentRequest = await RentRequest.create({
      listing: listingId,
      renter: req.user.id,
      owner: listing.seller._id,
      startDate,
      endDate,
      price: listing.price,
      message
    });

    res.json(rentRequest);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Accept rental request
exports.acceptRentRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await RentRequest.findById(requestId);

    if (!request || String(request.owner) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "accepted";
    await request.save();

    // Update listing calendar
    await Listing.findByIdAndUpdate(request.listing, {
      $push: {
        rentalCalendar: {
          startDate: request.startDate,
          endDate: request.endDate,
          status: "booked"
        }
      }
    });

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Reject rental request
exports.rejectRentRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await RentRequest.findById(requestId);

    if (!request || String(request.owner) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "rejected";
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get rental requests for a listing
exports.getListingRentRequests = async (req, res) => {
  try {
    const { listingId } = req.params;
    const requests = await RentRequest.find({ listing: listingId })
      .populate("renter", "name avatar")
      .populate("owner", "name avatar");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's rental requests
exports.getUserRentRequests = async (req, res) => {
  try {
    const requests = await RentRequest.find({
      $or: [{ renter: req.user.id }, { owner: req.user.id }]
    })
      .populate("listing")
      .populate("renter", "name avatar")
      .populate("owner", "name avatar");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};