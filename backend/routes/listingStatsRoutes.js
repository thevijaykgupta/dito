const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  incrementViews,
  getListingPerformance,
  getSellerDashboard
} = require("../controllers/listingStatsController");

router.post("/:listingId/view", auth, incrementViews);
router.get("/:listingId/performance", auth, getListingPerformance);
router.get("/dashboard", auth, getSellerDashboard);

module.exports = router;