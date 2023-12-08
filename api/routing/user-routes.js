const express = require("express");
const { getAllOtherUsers, sendFriendRequest } = require("../controllers/user-controller");


const userRouter = express.Router();

userRouter.get("/:userId", getAllOtherUsers);
userRouter.post("/friend-request", sendFriendRequest);

module.exports = userRouter;