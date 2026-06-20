const User = require("../models/User");
const Verification = require("../models/Verification");
const Listing = require("../models/Listing");
const Review = require("../models/Review");
const TrustScoreService = require("../services/trustScoreService");

// Get trust score breakdown
exports.getTrustScoreBreakdown = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    const verifications = await Verification.find({ user: userId });

    // Calculate breakdown
    const breakdown = {
      verification: {
        score: 0,
        max: 30,
        items: {
          studentId: verifications.some(v => v.type === "student_id" && v.status === "approved"),
          phone: !!user.phone,
          email: !!user.email,
          photo: !!user.avatar
        }
      },
      sellerBehavior: {
        score: 0,
        max: 35,
        items: {
          sales: Math.min((user.trustScore || 0) / 2, 20),
          disputes: 0,
          response: 0
        }
      },
      community: {
        score: 0,
        max: 20,
        items: {
          notes: 0,
          teamup: 0,
          events: 0
        }
      },
      buyer: {
        score: 0,
        max: 15,
        items: {
          purchases: 0,
          feedback: 0
        }
      }
    };

    // Calculate verification score
    if (breakdown.verification.items.studentId) breakdown.verification.score += 15;
    if (breakdown.verification.items.phone) breakdown.verification.score += 5;
    if (breakdown.verification.items.email) breakdown.verification.score += 5;
    if (breakdown.verification.items.photo) breakdown.verification.score += 3;

    const total = breakdown.verification.score +
      breakdown.sellerBehavior.score +
      breakdown.community.score +
      breakdown.buyer.score;

    res.json({ ...breakdown, total, trustScore: user.trustScore });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update trust score
exports.updateTrustScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const score = await TrustScoreService.updateUserTrustScore(userId);
    res.json({ trustScore: score });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Appeal trust score deduction
exports.appealTrustScore = async (req, res) => {
  try {
    const { disputeId } = req.body;

    // Create verification record for appeal
    const appeal = await Verification.create({
      user: req.user.id,
      type: "student_id",
      level: "verified_student",
      status: "pending",
      reviewNote: "Trust score appeal"
    });

    res.json(appeal);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get fraud detection signals
exports.getFraudSignals = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check for suspicious patterns
    const listings = await Listing.find({ seller: userId });
    const reviews = await Review.find({ reviewedUser: userId });

    const signals = {
      multipleAccounts: false,
      suspiciousPricing: listings.some(l => l.price < 10 || l.price > 100000),
      reportRate: 0,
      avgResponseTime: "unknown"
    };

    res.json(signals);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};