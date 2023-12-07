const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const authRouter = require("./routing/auth-routes"); // Change this line

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.json());
app.use("/auth", authRouter);

dotenv.config();

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => {
  console.log("Server running on port 8000");
});
