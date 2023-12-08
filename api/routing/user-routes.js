const express = require("express");
const { getAllOtherUsers } = require("../controllers/user-controller");


const userRouter = express.Router();

userRouter.get("/:userId", getAllOtherUsers);
userRouter.post("/friend-request", getAllOtherUsers);

module.exports = userRouter;