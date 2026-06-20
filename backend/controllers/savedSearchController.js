const SavedSearch = require("../models/SavedSearch");
const Listing = require("../models/Listing");

// Save a search
exports.saveSearch = async (req, res) => {
  try {
    const { query, filters } = req.body;

    const savedSearch = await SavedSearch.create({
      user: req.user.id,
      query,
      filters
    });

    res.json(savedSearch);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's saved searches
exports.getUserSavedSearches = async (req, res) => {
  try {
    const savedSearches = await SavedSearch.find({ user: req.user.id, active: true })
      .sort({ updatedAt: -1 });

    res.json(savedSearches);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a saved search
exports.deleteSavedSearch = async (req, res) => {
  try {
    const { searchId } = req.params;
    await SavedSearch.findByIdAndDelete(searchId);
    res.json({ message: "Saved search deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Check for matching listings (called when new listings are created)
exports.checkMatches = async (req, res) => {
  try {
    const listing = req.body;

    // Find all saved searches that match this listing
    const savedSearches = await SavedSearch.find({ active: true });

    for (const search of savedSearches) {
      const matches = checkListingMatch(listing, search);
      if (matches) {
        // Update last matched time
        await SavedSearch.findByIdAndUpdate(search._id, {
          lastMatched: new Date()
        });
      }
    }

    res.json({ message: "Matches checked" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

function checkListingMatch(listing, savedSearch) {
  // Check if query matches
  if (savedSearch.query && !listing.title.toLowerCase().includes(savedSearch.query.toLowerCase())) {
    return false;
  }

  // Check filters
  if (savedSearch.filters.categories?.length && !savedSearch.filters.categories.includes(listing.category)) {
    return false;
  }

  if (savedSearch.filters.hostels?.length && !savedSearch.filters.hostels.includes(listing.hostel)) {
    return false;
  }

  return true;
}