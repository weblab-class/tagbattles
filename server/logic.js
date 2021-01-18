const CardPacks = require("./models/card_pack");

const NUMBER_OF_CARDS = 10;

// Creates a game and adds it to the gameStates
// should add round_time afterward
// card_pack_ids is a list
const createGame = (cardPackIDs, playerIDs) => {
  
  const gameID = "123456";
	// Collect all black and white cards from the card packs
  const allCards = findAllCards(cardPackIDs);
  const promptCards = allCards['promptCards'];
	const responseCards = allCards['responseCards'];
	
	// Create all player objects
  let players = [];
  playerIDs.forEach((player_id) => {
    players.push({
			'_id': player_id,
			'score' : 0,
      'responseCards' : getRandomElementsFromArray(responseCards, NUMBER_OF_CARDS),
			'chosenResponse' : '',
    });
  });
  
	return {
    'gameID': gameID,
		'promptsCards' : promptCards,
		'responseCards' : responseCards,
		'players' : players,
    'promptCard' : '',
		'judgeID' : players[0]._id,
	}
}

const getRandomElementsFromArray = (arr, numberOfElementsToGet) => {
  let randomElements = [];
  for (let i = 0; i < numberOfElementsToGet; i++) {
    randomElements.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomElements;
};

const addPlayerToGame = (player, gameState) => {
  gameState.playerInfo = [...gameState.playerInfo, player];
  return gameState;
}

const findAllCards = (cardPackIDs) => {
	// Collect all black and white cards from the card packs
	let promptCards = ["a", "b", "c"];
  let responseCards = ['d', 'e', 'f'];
  cardPackIDs.forEach(cardPackID => {
    CardPacks.findById(cardPackID).then((CardPack) => {
			if (CardPack) {
        promptCards = [...promptCards, ...CardPack.prompt_cards];
        responseCards = [...responseCards, ...CardPack.response_cards];
      }
		}).catch((error) => console.log("Error", error));
  })


	return {
		'promptCards' : promptCards,
		'responseCards' : responseCards,
	}
};

// When a player plays N cards
const replaceResponseCard = (gameState, playerID, cardIndex) => {
	player[getPlayerByID(gameState, playerID)].responseCards[cardIndex] = getRandomElementsFromArray(gameState.responseCards, 1)[0]
  return gameState;
}

const getNewPromptCard = (gameState) => {
  return getRandomElementsFromArray(gameState.promptCards, 1)[0];
}

const assignPromptCard = (gameState, promptCard) => {
  gameState.promptCard = promptCard;
  return gameState;
}

const selectResponseCard = (gameState, playerID, cardIndex) => {
  const playerIndex = getPlayerByID(gameState, playerID);
  gameState.players[playerIndex].chosenResponse = gameState.players[playerIndex].responseCards[cardIndex];
}

const assignWinner = (gameState, winnerID) => {
  // find the winner by id and increase his score
  gameState.players[getPlayerByID(gameState, winnerID)].score += 1;
  // find the judge by id and switch to the next player (note that we need to take the module)
  gameState.judgeID = gameState.players[(getPlayerByID(gameState, gameState.judgeID) + 1) % gameState.players.length]._id;
}

// Search for player by ID
const getPlayerByID = (gameState, ID) => {
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i]._id === ID) {
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
  assignWinner,
  selectResponseCard,
}