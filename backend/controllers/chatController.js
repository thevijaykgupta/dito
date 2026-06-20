const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");
// Create Chat
exports.createChat = async (req, res) => {
  try {

    const { receiverId } = req.body;

    let chat = await Chat.findOne({
      users: {
        $all: [req.user.id, receiverId]
      }
    });

    if (chat) {
      return res.json(chat);
    }

    chat = await Chat.create({
      users: [req.user.id, receiverId]
    });

    res.json(chat);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
// Send Message
exports.sendMessage = async (req, res) => {
  try {
    console.log("SEND MESSAGE");
    console.log(req.body);
    console.log(req.user);

    const { chatId, text } = req.body;

    const message = await Message.create({
      chatId,
      sender: req.user.id,
      text
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: text,
      updatedAt: new Date()
    });

    res.json(message);

  } catch (err) {

    console.log("CHAT ERROR");
    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
};

// Get Messages
exports.getMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      chatId: req.params.chatId
    });

    res.json(messages);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
};
// Get My Chats
exports.getMyChats = async (req, res) => {
  try {

    console.log("MY USER");
    console.log(req.user);

    console.log("USER ID TYPE:", typeof req.user.id);

    const allChats = await Chat.find();

    console.log("ALL CHATS");
    console.log(JSON.stringify(allChats, null, 2));

const mongoose = require("mongoose");

const chats = await Chat.find({
  users: req.user.id
}).populate("users", "name email avatar");

    console.log("CHATS FOUND");
    console.log(chats);

    res.json(chats);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
};