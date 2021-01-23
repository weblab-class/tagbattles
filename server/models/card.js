const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  text: String,
  cardID: String,
});

// compile model from schema
module.exports = mongoose.model("Card", CardSchema);