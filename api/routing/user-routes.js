const express = require("express");
const { getAllOtherUsers, sendFriendRequest, friendRequestsOfUser, acceptFriendRequest, getAllAcceptedFriends, getRecepientDetails, alreadySendFriendRequests,  } = require("../controllers/user-controller");


const userRouter = express.Router();

userRouter.get("/:userId", getAllOtherUsers);
userRouter.post("/friend-request", sendFriendRequest);
userRouter.get("/friend-request/:userId", friendRequestsOfUser);
userRouter.post("/friend-request/accept", acceptFriendRequest);
userRouter.get("/accepted-friends/:userId", getAllAcceptedFriends);
userRouter.get("/recepient-details/:userId", getRecepientDetails);
userRouter.get("/sent-friend-requests/:userId", alreadySendFriendRequests);

module.exports = userRouter;