const Review = require("../models/Review");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { reviewedUserId, listingId, rating, comment, type } = req.body;

    // Verify listing exists and transaction is complete
    if (listingId) {
      const listing = await Listing.findById(listingId);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      if (listing.status !== "sold" && listing.status !== "rented") {
        return res.status(400).json({ message: "Transaction not complete" });
      }
    }

    const review = await Review.create({
      reviewer: req.user.id,
      reviewedUser: reviewedUserId,
      listing: listingId || null,
      rating,
      comment,
      type: type || "marketplace"
    });

    // Update user's trust score (simple calculation)
    const userReviews = await Review.find({ reviewedUser: reviewedUserId });
    const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;

    await User.findByIdAndUpdate(reviewedUserId, {
      $inc: { trustScore: Math.floor(avgRating) >= 4 ? 2 : 0 }
    });

    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get reviews for a user
exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ reviewedUser: userId })
      .populate("reviewer", "name avatar")
      .populate("listing", "title")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's review stats
exports.getUserReviewStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ reviewedUser: userId });

    const stats = {
      averageRating: reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
      totalReviews: reviews.length,
      breakdown: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
      }
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};