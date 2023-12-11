const User = require("../models/User");



//endpoint to get the userDetails to design the chat Room header
const getLoggedInUserDetails= async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const user = await User.findById(userId);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


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


//endpoint to get the userDetails to design the chat Room header
const getRecepientDetails= async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recepientId = await User.findById(userId);

    res.json(recepientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//endpoint to get send friend requests
const alreadySendFriendRequests = async(req,res) => {
  try{
    const {userId} = req.params;
    const user = await User.findById(userId).populate("sentFriendRequests","name email image").lean();

    const sentFriendRequests = user.sentFriendRequests;

    res.json(sentFriendRequests);
  } catch(error){
    console.log("error",error);
    res.status(500).json({ error: "Internal Server" });
  }
}

//endpoint to get friends of a user
const getUserFriends = (req,res) => {
  try{
    const {userId} = req.params;

    User.findById(userId).populate("friends").then((user) => {
      if(!user){
        return res.status(404).json({message: "User not found"})
      }

      const friendIds = user.friends.map((friend) => friend._id);

      res.status(200).json(friendIds);
    })
  } catch(error){
    console.log("error",error);
    res.status(500).json({message:"internal server error"})
  }
}


const updateUserDetails = async (req, res) => {
  const { name, email, password, image } = req.body;
  const userId = req.params.userId; // Assuming you have the user ID in the URL parameters

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user fields
    user.name = name || user.name; // Update only if name is provided
    user.email = email || user.email; // Update only if email is provided
    user.password = password || user.password; // Update only if password is provided

    if (image) {
      user.image = image; // Update image only if provided
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user', error);
    return res.status(500).json({ message: 'Error updating the user' });
  }
};

module.exports = {
  getLoggedInUserDetails,
  getAllOtherUsers,
  sendFriendRequest,
  friendRequestsOfUser,
  acceptFriendRequest,
  getAllAcceptedFriends,
  getRecepientDetails,
  alreadySendFriendRequests,
  getUserFriends,
  updateUserDetails
};
