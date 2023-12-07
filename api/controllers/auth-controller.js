
const User = require("../models/User");
//endpoint for registration of the user

const registerUser = async(req, res) => {
    const { name, email, password, image } = req.body;
  
    // create a new User object
    const newUser = new User({ name, email, password, image });
  
    // save the user to the database
    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User registered successfully" });
      })
      .catch((err) => {
        console.log("Error registering user", err);
        res.status(500).json({ message: "Error registering the user!" });
      });
  };

  module.exports = {
    registerUser
  }