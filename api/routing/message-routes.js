const express = require("express");
const { sendMessage } = require("../controllers/message-controller");

const messageRouter = express.Router();

//messageRouter.post("/send-message", sendMessage);

module.exports = messageRouter;