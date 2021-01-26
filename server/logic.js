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
    'currentRound': [],
    'host' : '',
    'rounds' : 3,
    'round': 0,
    'decks': [],
    'reset': false,
    'status': "lobby", // lobby, inSession, or leaderboard
    'promptCard' : null,
    'responseCards' : null,
    'isActive' : false,
    'promptCards' : null,
    'judgeID': "",
    'chat': [],
    'roundCounter': 0,
  }
} 

const startGame = (gameState) => {
  gameState.isActive = true;
  let players = [...gameState.players]
  gameState.players = []
  gameState.currentRound = []
  gameState.status = "inSession";
  for (let i = 0; i < players.length; i++) {
    addPlayerToGame(gameState, players[i]);
  }
  gameState.round = 1;
  gameState.judgeID = players[0]._id;
}

const addPlayerToGame = (gameState, player) => {
  gameState.players.push({
    '_id': player._id,
    'name' : player.name,
    'score' : 0,
    'responseCards' : gameState.isActive ? getRandomElementsFromArray(gameState.responseCards, NUMBER_OF_CARDS) : null,
    'chosenResponse' : null,
    'roundCounter': 0,
  });
  // Add player into the current round if game active
  if(gameState.isActive){
    gameState.currentRound.push(gameState.players[gameState.players.length-1]);
  }

  // Set player to host if only 1 player in game
  if(gameState.players.length === 1){
    //console.log("Place 1:", player._id);
    gameState.host = player._id;
  }
  return gameState;
}

const getRandomElementsFromArray = (arr, numberOfElementsToGet) => {
  let randomElements = [];
  let randomIndices = [];
  for(let i = 0; i<numberOfElementsToGet; i++){
    let num = Math.floor(Math.random() * arr.length);
    while(randomIndices.includes(num)){
      num = Math.floor(Math.random() * arr.length);
    }
    randomIndices.push(num);
  }
  for (let i = 0; i < numberOfElementsToGet; i++) {
    randomElements.push(arr[randomIndices[i]]);
  }
  return randomElements;
};

const findAllCards = async (cardPackNames) => {
	// Collect all black and white cards from the card packs
	let promptCards = [];
  let responseCards = [];
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
const replaceResponseCard = (gameState, playerID, cardIndex) => {  
  // Gets the card index
  let playerIndex = getPlayerByID(gameState, playerID);
  gameState.players[playerIndex].responseCards[cardIndex] = getRandomElementsFromArray(gameState.responseCards, 1)[0]
  return gameState;
}

const getNewPromptCard = (gameState) => {
  const card = getRandomElementsFromArray(gameState.promptCards, 1)[0];
  gameState.promptCard = card;
  return card;
}

const selectResponseCard = (gameState, playerID, cardIndex) => {
  const playerIndex = getPlayerByID(gameState, playerID);
  //console.log(cardIndex)
  //console.log("gameState.players[playerIndex].responseCards[cardIndex]", gameState.players[playerIndex].responseCards[cardIndex])
  gameState.players[playerIndex].chosenResponse = gameState.players[playerIndex].responseCards[cardIndex];
  gameState.players[playerIndex].roundCounter = gameState.roundCounter;
  replaceResponseCard(gameState, playerID, cardIndex);
}

const removePlayerFromGame = (gameState, playerID)=>{
  let i;
  for (i = 0; i < gameState.players.length; ++i) {
    player = gameState.players[i]
    if (playerID=== player._id) {
      // Set that player to active
      gameState.inactivePlayers.push(gameState.players.splice(i, 1));
      break;
    }
  }
}

const beginNewRound = (gameState) => {
  _players = [...gameState.players];
  gameState.currentRound = []
  for(let i =0 ; i<gameState.players.length; i++){
    gameState.currentRound.push(_players[i])
  }
  return gameState;
}

const assignWinnerAndUpdateJudge = (gameState, winnerID) => {
  // find the winner by id and increase his score
  console.log("In assigning winner and updating judge")
  console.log("Updating judge for gameID ", gameState.gameID);
  for(let i = 0; i < gameState.players.length; i++) {
    gameState.players[i].chosenResponse = null;
    gameState.players[i].responseCards = getRandomElementsFromArray(gameState.responseCards, NUMBER_OF_CARDS);
  }
  gameState.promptCard = null;
  // find the judge by id and switch to the next player (note that we need to take the module)
  gameState.judgeID = gameState.currentRound.pop()._id;
}

const getNumberOfThinkingPlayers = (gameState) => {
  //console.log("players", gameState.players)
  let numberOfThinkingPlayers = gameState.players.length - 1;
  for (let i = 0; i < gameState.players.length; i++) {
    //console.log(gameState.players[i].chosenResponse, gameState.players[i].name)
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
  assignWinnerAndUpdateJudge,
  selectResponseCard,
  getNumberOfThinkingPlayers,
  getPlayerCards,
  startGame,
  beginNewRound,
  removePlayerFromGame,
  addSettingsToGame
}