const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: {
    _id: String,
    name: String,
  },
  recipient: {
    _id: String,
    name: String
  },
  message: String,
});

module.exports = mongoose.model("chat", ChatSchema);