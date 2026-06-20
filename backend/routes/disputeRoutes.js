const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createDispute,
  getUserDisputes,
  respondToDispute,
  resolveDispute,
  getAllDisputes
} = require("../controllers/disputeController");

router.post("/", auth, createDispute);
router.get("/my", auth, getUserDisputes);
router.put("/:disputeId/respond", auth, respondToDispute);
router.put("/:disputeId/resolve", auth, resolveDispute); // Admin only
router.get("/", auth, getAllDisputes); // Admin only

module.exports = router;