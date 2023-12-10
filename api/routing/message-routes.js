const express = require("express");
const { fetchMessagesInSingleChat, sendMessage, deleteMessages } = require("../controllers/message-controller");

const messageRouter = express.Router();

messageRouter.post("/send-message", sendMessage);
messageRouter.get("/:senderId/:recepientId", fetchMessagesInSingleChat);
messageRouter.post("/deleteMessages", deleteMessages);


module.exports = messageRouter;