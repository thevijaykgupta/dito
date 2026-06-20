const Notification = require("../models/Notification");
const SavedSearch = require("../models/SavedSearch");
const Listing = require("../models/Listing");

class NotificationService {
  // Generate notifications when new listing is created
  static async generateListingNotifications(listing) {
    try {
      const savedSearches = await SavedSearch.find({ active: true });

      for (const search of savedSearches) {
        const matches = this.listingMatchesSearch(listing, search);

        if (matches) {
          await Notification.create({
            user: search.user,
            type: "new_listing_match",
            title: "New listing matches your saved search",
            body: `"${listing.title}" matches your search for "${search.query || 'any category'}""`,
            listing: listing._id,
            savedSearch: search._id
          });

          // Update last matched timestamp
          await SavedSearch.findByIdAndUpdate(search._id, {
            lastMatched: new Date()
          });
        }
      }

      return savedSearches.length;
    } catch (err) {
      console.error("Notification generation error:", err);
      return 0;
    }
  }

  // Check if listing matches saved search
  static listingMatchesSearch(listing, savedSearch) {
    // Query match
    if (savedSearch.query && !listing.title.toLowerCase().includes(savedSearch.query.toLowerCase())) {
      return false;
    }

    // Category filter
    if (savedSearch.filters?.categories?.length > 0 && !savedSearch.filters.categories.includes(listing.category)) {
      return false;
    }

    // Hostel filter
    if (savedSearch.filters?.hostels?.length > 0 && listing.hostel && !savedSearch.filters.hostels.includes(listing.hostel)) {
      return false;
    }

    // Price range
    if (savedSearch.filters?.priceRange) {
      const { min, max } = savedSearch.filters.priceRange;
      if (listing.price < min || listing.price > max) {
        return false;
      }
    }

    return true;
  }

  // Get user notifications
  static async getUserNotifications(userId, options = {}) {
    const { unreadOnly = false, limit = 50 } = options;

    const query = unreadOnly
      ? { user: userId, read: true }
      : { user: userId };

    return await Notification.find(query)
      .populate("listing", "title price")
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  // Mark notification as read
  static async markAsRead(notificationId, userId) {
    const notification = await Notification.findOne({
      _id: notificationId,
      user: userId
    });

    if (notification) {
      notification.read = true;
      await notification.save();
      return notification;
    }

    return null;
  }
}

module.exports = NotificationService;