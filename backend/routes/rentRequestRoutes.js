const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createRentRequest,
  acceptRentRequest,
  rejectRentRequest,
  getListingRentRequests,
  getUserRentRequests
} = require("../controllers/rentRequestController");

router.post("/", auth, createRentRequest);
router.put("/:requestId/accept", auth, acceptRentRequest);
router.put("/:requestId/reject", auth, rejectRentRequest);
router.get("/listing/:listingId", auth, getListingRentRequests);
router.get("/my", auth, getUserRentRequests);

module.exports = router;