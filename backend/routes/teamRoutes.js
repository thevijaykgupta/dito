const router = require("express").Router();
const auth = require("../middleware/auth");
const { createProfile, matchUsers } = require("../controllers/teamController");

router.post("/create", auth, createProfile);
router.post("/match", matchUsers);

module.exports = router;