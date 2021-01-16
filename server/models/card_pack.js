const mongoose = require("mongoose");

const CardPackSchema = new mongoose.Schema({
  name: String,
  prompt_cards: [String],
  response_cards: [String],
});

// compile model from schema
module.exports = mongoose.model("card_pack", CardPackSchema);