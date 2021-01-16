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
			'points' : 0,
			'responseCards' : getRandomElementsFromArray(responseCards, NUMBER_OF_CARDS),
    })
  })
  
	return {
    'gameID': gameID,
		'promptsCards' : promptCards,
		'responseCards' : responseCards,
		'players' : players,
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
const replaceCard = (gameState, playerID, cardIndex) => {
	gameState.players.forEach((player) => {
		if (player._id === playerID) {
			player.responseCards[cardIndex] = getRandomElementsFromArray(gameState.responseCards, 1)[0];
		}
  });
  return gameState;
}

module.exports = {
  createGame,
  getRandomElementsFromArray,
  addPlayerToGame,
  findAllCards,
  replaceCard,
}