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
const sendFriendRequest = async (req, res) => {
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

    res.status(200).json({ message: "Friend request send" });
  } catch (error) {
    res.status(500);
  }
};

//endpoint to show all the friend-requests of a particular user
const friendRequestsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user document based on the User id
    const user = await User.findById(userId)
      .populate("freindRequests", "name email image")
      .lean();

    const freindRequests = user.freindRequests;

    res.status(200).json(freindRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//endpoint to accept a friend-request of a particular person
const acceptFriendRequest = async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    //retrieve the documents of sender and the recipient
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.freindRequests = recepient.freindRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//endpoint to access all the friends of the logged in user!
const getAllAcceptedFriends = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate(
        "friends",
        "name email image"
      );
      const acceptedFriends = user.friends;
      res.json(acceptedFriends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = {
  getAllOtherUsers,
  sendFriendRequest,
  friendRequestsOfUser,
  acceptFriendRequest,
  getAllAcceptedFriends
};
