const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  submitReport,
  getReports,
  updateReportStatus,
  getUserReports
} = require("../controllers/reportController");

router.post("/", auth, submitReport);
router.get("/my", auth, getUserReports);
router.get("/", auth, getReports); // Admin only
router.put("/:reportId", auth, updateReportStatus); // Admin only

module.exports = router;