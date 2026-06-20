const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  renewListing,
  reactivateListing,
  getExpiringListings
} = require("../controllers/listingExpiryController");

router.put("/:listingId/renew", auth, renewListing);
router.put("/:listingId/reactivate", auth, reactivateListing);
router.get("/expiring", auth, getExpiringListings);

module.exports = router;