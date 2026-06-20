const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createReview,
  getUserReviews,
  getUserReviewStats
} = require("../controllers/reviewController");

router.post("/", auth, createReview);
router.get("/user/:userId", auth, getUserReviews);
router.get("/user/:userId/stats", auth, getUserReviewStats);

module.exports = router;