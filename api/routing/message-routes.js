const express = require("express");
const { fetchMessagesInSingleChat } = require("../controllers/message-controller");

const messageRouter = express.Router();

//messageRouter.post("/send-message", sendMessage);
messageRouter.get("/:senderId/:recepientId", fetchMessagesInSingleChat);

module.exports = messageRouter;