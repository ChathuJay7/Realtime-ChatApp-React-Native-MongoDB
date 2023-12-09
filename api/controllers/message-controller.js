const User = require("../models/User");
const Message = require("../models/Message");
const multer = require("multer");

// const upload = multer({ storage: storage });

// // Configure multer for handling file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "files/"); // Specify the desired destination folder
//     },
//     filename: function (req, file, cb) {
//       // Generate a unique filename for the uploaded file
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//     },
//   });

// //endpoint to post Messages and store it in the backend
// const sendMessage = async (req, res) => {
//   try {
//     const { senderId, recepientId, messageType, messageText } = req.body;

//     const newMessage = new Message({
//       senderId,
//       recepientId,
//       messageType,
//       message: messageText,
//       timestamp: new Date(),
//       imageUrl: messageType === "image" ? req.file.path : null,
//     });

//     await newMessage.save();
//     res.status(200).json({ message: "Message sent Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// app.get("/messages/:senderId/:recepientId", async (req, res) => {
//endpoint to fetch the messages between two users in the chatRoom
const fetchMessagesInSingleChat = async (req, res) => {
    try {
      const { senderId, recepientId } = req.params;
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, recepientId: recepientId },
          { senderId: recepientId, recepientId: senderId },
        ],
      }).populate("senderId", "_id name");
  
      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = {
    //sendMessage
    fetchMessagesInSingleChat
};
