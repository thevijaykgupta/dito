const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getTrustScoreBreakdown,
  updateTrustScore,
  appealTrustScore,
  getFraudSignals
} = require("../controllers/trustController");

router.get("/user/:userId", auth, getTrustScoreBreakdown);
router.put("/:userId/update", auth, updateTrustScore);
router.post("/appeal", auth, appealTrustScore);
router.get("/signals/:userId", auth, getFraudSignals);

module.exports = router;