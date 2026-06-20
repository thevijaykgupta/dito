const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createOffer,
  counterOffer,
  acceptOffer,
  rejectOffer,
  getListingOffers,
  getUserOffers,
  expireOldOffers
} = require("../controllers/offerController");

router.post("/", auth, createOffer);
router.put("/:offerId/counter", auth, counterOffer);
router.put("/:offerId/accept", auth, acceptOffer);
router.put("/:offerId/reject", auth, rejectOffer);
router.get("/listing/:listingId", auth, getListingOffers);
router.get("/my", auth, getUserOffers);
router.post("/expire", auth, expireOldOffers); // Admin endpoint

module.exports = router;