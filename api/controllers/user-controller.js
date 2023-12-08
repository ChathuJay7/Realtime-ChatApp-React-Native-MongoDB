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


//endpoint to send a request to a user
const sendFriendRequest =  async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;
  
    try {
      //update the recepient's friendRequestsArray!
      await User.findByIdAndUpdate(selectedUserId, {
        $push: { freindRequests: currentUserId },
      });
  
      //update the sender's sentFriendRequests array
      await User.findByIdAndUpdate(currentUserId, {
        $push: { sentFriendRequests: selectedUserId },
      });
  
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  };


module.exports = {
    getAllOtherUsers, sendFriendRequest
};