const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  nickname: String,
  userID: String,
  hatChoice: Number,
  mouthChoice: Number,
  colorChoice: Number,
  eyeChoice: Number,
});

// compile model from schema
module.exports = mongoose.model("Player", PlayerSchema);