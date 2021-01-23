const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  hatID: Number,
  mouthID: Number,
  colorID: Number,
  eyeID: Number,
  bio: String,
  favCard: String,
  gameWins: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);