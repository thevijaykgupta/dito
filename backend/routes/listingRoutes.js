const router = require("express").Router();
const auth = require("../middleware/auth");
const { createListing, getListings } = require("../controllers/listingController");

router.post("/create", auth, createListing);
router.get("/", getListings);

module.exports = router;