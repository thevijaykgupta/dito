const router = require("express").Router();
const auth = require("../middleware/auth");
const { createListing, getListings, confirmTransaction, markAsSold } = require("../controllers/listingController");

router.post("/create", auth, createListing);
router.get("/", getListings);
router.put("/:listingId/confirm", auth, confirmTransaction);
router.put("/:listingId/sold", auth, markAsSold);

module.exports = router;