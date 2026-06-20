const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  saveSearch,
  getUserSavedSearches,
  deleteSavedSearch,
  checkMatches
} = require("../controllers/savedSearchController");

router.post("/save", auth, saveSearch);
router.get("/my", auth, getUserSavedSearches);
router.delete("/:searchId", auth, deleteSavedSearch);
router.post("/check-matches", auth, checkMatches); // Internal endpoint

module.exports = router;