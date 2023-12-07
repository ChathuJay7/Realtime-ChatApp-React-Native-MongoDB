const express = require("express");
const { registerUser } = require("../controllers/auth-controller");


const authRouter = express.Router();

authRouter.post("/register", registerUser);

module.exports = authRouter;