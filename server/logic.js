const CardPacks = require("./models/card_pack");

const NUMBER_OF_CARDS = 10;

// Creates a game and adds it to the gameStates
// should add round_time afterward
// card_pack_ids is a list
const addSettingsToGame = async (gameState, cardPackNames, rounds) => {
  
	// Collect all black and white cards from the card packs
  const allCards = await findAllCards(cardPackNames);
  const promptCards = allCards['promptCards'];
  const responseCards = allCards['responseCards'];
	
  gameState.rounds = rounds
  gameState.responseCards = responseCards
  gameState.promptCards = promptCards
  return gameState 
}

const createGame = (gameID) => {
  return {
    'gameID': gameID,
    'players' : [],
    'inactivePlayers' : [],
    'promptCard' : null,
    'responseCards' : null,
    'isActive' : false,
    'promptCards' : null
  }
} 

const startGame = (gameState) => {
  gameState.isActive = true;
  let players = [...gameState.players]
  gameState.players = []
  for (let i = 0; i < players.length; i++) {
    addPlayerToGame(gameState, players[i]);
  }

  gameState.judgeID = players[0]._id;
}

const addPlayerToGame = (gameState, player) => {
  gameState.players.push({
    '_id': player._id,
    'name' : player.name,
    'score' : 0,
    'responseCards' : gameState.isActive ? getRandomElementsFromArray(gameState.responseCards, NUMBER_OF_CARDS) : null,
    'chosenResponse' : null,
  });
  return gameState;
}

const getRandomElementsFromArray = (arr, numberOfElementsToGet) => {
  let randomElements = [];
  for (let i = 0; i < numberOfElementsToGet; i++) {
    randomElements.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomElements;
};

const findAllCards = async (cardPackNames) => {
	// Collect all black and white cards from the card packs
	let promptCards = ["a", "b", "c"];
  let responseCards = ['d', 'e', 'f'];
  for (let i = 0; i < cardPackNames.length; i++) {
    let cardPackName = cardPackNames[i];
    await CardPacks.findOne({'name' : cardPackName}).then((CardPack) => {
		  if (CardPack) {
        promptCards = promptCards.concat(CardPack.prompt_cards);
        responseCards = responseCards.concat(CardPack.response_cards);
      }
    });
  }
  return {
    'promptCards' : promptCards,
    'responseCards' : responseCards,
  }
};

// When a player plays N cards
const replaceResponseCard = (gameState, playerID, card) => {  
  // Gets the card index
  let playerIndex = getPlayerByID(gameState, playerID);
  let cardIndex = getCardByText(gameState.players[playerIndex].responseCards, card)
  gameState.players[playerIndex].responseCards[cardIndex] = getRandomElementsFromArray(gameState.responseCards, 1)[0]
  return gameState;
}

const getNewPromptCard = (gameState) => {
  return getRandomElementsFromArray(gameState.promptCards, 1)[0];
}

const assignPromptCard = (gameState, promptCard) => {
  gameState.promptCard = promptCard;
  return gameState;
}

const selectResponseCard = (gameState, playerID, card) => {
  const playerIndex = getPlayerByID(gameState, playerID);
  gameState.players[playerIndex].chosenResponse = card;
  replaceResponseCard(gameState, playerID, card);
}

const assignWinnerAndUpdateJudge = (gameState, winnerID) => {
  // find the winner by id and increase his score
  gameState.players[getPlayerByID(gameState, winnerID)].score += 1;
  // find the judge by id and switch to the next player (note that we need to take the module)
  gameState.judgeID = gameState.players[(getPlayerByID(gameState, gameState.judgeID) + 1) % gameState.players.length]._id;
}

const getNumberOfThinkingPlayers = (gameState) => {
  let numberOfThinkingPlayers = gameState.players.length - 1;
  for (let i = 0; i < gameState.players.length; i++) {
    if(gameState.players[i].chosenResponse) {
      numberOfThinkingPlayers -= 1;
    }
  }
  return numberOfThinkingPlayers;
}

const getPlayerCards = (gameState, ID) => {
  let index = getPlayerByID(gameState, ID)
  return gameState.players[index].responseCards;
}
// Search for player by ID
const getPlayerByID = (gameState, ID) => {
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i]._id === ID) {
      return i;
    }
  }
  return -1;
}

const getCardByText = (cards, card) => {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] === card) {
      return i;
    }
  }
}

module.exports = {
  createGame,
  getRandomElementsFromArray,
  addPlayerToGame,
  findAllCards,
  replaceResponseCard,
  getNewPromptCard,
  assignPromptCard,
  assignWinnerAndUpdateJudge,
  selectResponseCard,
  getNumberOfThinkingPlayers,
  getPlayerCards,
  startGame,
  addSettingsToGame
}