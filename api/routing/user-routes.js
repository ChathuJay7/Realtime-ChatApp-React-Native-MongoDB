const express = require("express");
const { getAllOtherUsers, sendFriendRequest, friendRequestsOfUser, acceptFriendRequest } = require("../controllers/user-controller");


const userRouter = express.Router();

userRouter.get("/:userId", getAllOtherUsers);
userRouter.post("/friend-request", sendFriendRequest);
userRouter.get("/friend-request/:userId", friendRequestsOfUser);
userRouter.post("/friend-request/accept", acceptFriendRequest);


module.exports = userRouter;