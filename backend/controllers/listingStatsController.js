const ListingStats = require("../models/ListingStats");
const Listing = require("../models/Listing");

// Record stats daily
exports.recordDailyStats = async (listingId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let stats = await ListingStats.findOne({ listing: listingId, date: today });

  if (!stats) {
    stats = await ListingStats.create({
      listing: listingId,
      date: today,
      views: 0,
      saves: 0,
      offerCount: 0,
      messages: 0
    });
  }

  return stats;
};

// Increment view count
exports.incrementViews = async (req, res) => {
  try {
    const { listingId } = req.params;

    await ListingStats.findOneAndUpdate(
      { listing: listingId, date: new Date() },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    // Also increment main listing view count
    await Listing.findByIdAndUpdate(listingId, { $inc: { views: 1 } });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get listing performance
exports.getListingPerformance = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Get last 7 days of stats
    const stats = await ListingStats.find({
      listing: listingId,
      date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }).sort({ date: 1 });

    // Aggregate with listing data
    const listing = await Listing.findById(listingId)
      .populate("seller", "name trustScore");

    const aggregated = {
      totalViews: stats.reduce((sum, s) => sum + s.views, 0),
      totalSaves: stats.reduce((sum, s) => sum + s.saves, 0),
      totalOffers: stats.reduce((sum, s) => sum + s.offerCount, 0),
      totalMessages: stats.reduce((sum, s) => sum + s.messages, 0),
      dailyStats: stats.map(s => ({
        date: s.date,
        views: s.views,
        saves: s.saves,
        offers: s.offerCount,
        messages: s.messages
      }))
    };

    res.json({ ...aggregated, listing });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get seller dashboard stats
exports.getSellerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const listings = await Listing.find({ seller: userId });
    const listingIds = listings.map(l => l._id);

    const periodStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const stats = await ListingStats.aggregate([
      {
        $match: {
          listing: { $in: listingIds },
          date: { $gte: periodStart }
        }
      },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
          totalSaves: { $sum: "$saves" },
          totalOffers: { $sum: "$offerCount" },
          totalMessages: { $sum: "$messages" }
        }
      }
    ]);

    res.json({
      totalListings: listings.length,
      totalViews: stats[0]?.totalViews || 0,
      totalSaves: stats[0]?.totalSaves || 0,
      totalOffers: stats[0]?.totalOffers || 0,
      totalMessages: stats[0]?.totalMessages || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};