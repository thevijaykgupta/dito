const User = require("../models/User");
const Listing = require("../models/Listing");
const Review = require("../models/Review");

class TrustScoreService {
  // Calculate trust score for a user
  static async calculateTrustScore(userId) {
    let score = 0;
    const user = await User.findById(userId);

    if (!user) return 0;

    // Verification (30 points max)
    if (user.isVerified) score += 15; // Student ID verified
    if (user.phone) score += 5; // Phone linked
    if (user.email) score += 5; // Email verified (required)
    if (user.avatar) score += 3; // Profile photo

    // Seller behavior (35 points max)
    const listings = await Listing.find({ seller: userId });
    const soldListings = listings.filter(l => l.status === "sold");
    score += Math.min(soldListings.length * 2, 20); // +2 per sale, max 10 sales

    // Reviews
    const reviews = await Review.find({ reviewedUser: userId });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    if (avgRating >= 4) score += 2;

    // Buyer behavior (15 points max)
    // Would need transaction records - simplified for now

    // Clamp to 0-100
    return Math.max(0, Math.min(100, score));
  }

  // Update user's trust score
  static async updateUserTrustScore(userId) {
    const score = await this.calculateTrustScore(userId);
    await User.findByIdAndUpdate(userId, { trustScore: score });
    return score;
  }
}

module.exports = TrustScoreService;