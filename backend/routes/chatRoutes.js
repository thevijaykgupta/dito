const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  createChat,
  sendMessage,
  getMessages,
  getMyChats
} = require("../controllers/chatController");

router.get("/", auth, getMyChats);

router.post("/create", auth, createChat);
router.post("/send", auth, sendMessage);
router.get("/:chatId", auth, getMessages);

module.exports = router;