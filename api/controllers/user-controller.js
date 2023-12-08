const User = require("../models/User");

//endpoint to access all the users except the user who's is currently logged in!
const getAllOtherUsers = (req, res) => {
    const loggedInUserId = req.params.userId;
  
    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({ message: "Error retrieving users" });
      });
};


module.exports = {
    getAllOtherUsers
};