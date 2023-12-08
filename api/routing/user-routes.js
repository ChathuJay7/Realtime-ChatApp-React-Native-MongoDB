const express = require("express");
const { getAllOtherUsers, sendFriendRequest, friendRequestsOfUser } = require("../controllers/user-controller");


const userRouter = express.Router();

userRouter.get("/:userId", getAllOtherUsers);
userRouter.post("/friend-request", sendFriendRequest);
userRouter.get("/friend-request/:userId", friendRequestsOfUser);


module.exports = userRouter;