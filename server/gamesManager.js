const logic = require("./logic");

allGames = []

const getParticularGameIndex = (gameID) => {
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].gameID === gameID) {
      return i;
    }
  }
  return -1;
}

const getNewPromptCard = (gameID) => {
  const index = getParticularGameIndex(gameID)
  console.log(gameID, index);
  if (index !== -1) {
    return logic.getNewPromptCard(allGames[index])
  }
  return -1;
}

const selectPromptCard = (gameID, card) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    logic.assignPromptCard(allGames[index], card)
  }
  return 0;
}

const getChosenResponses = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    let responses = []
    for (let i = 0; i < allGames[index].players.length; i++) {
      player = allGames[index].players[i]
      if (player.chosenResponse && player._id !== allGames[index].judgeID) {
        responses.push({'playerID' : player._id, card:player.chosenResponse})
      }
    }
    return responses;
  }
  return [];
}

const selectWinnerAndUpdateJudge = (gameID, winnerID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    logic.assignWinnerAndUpdateJudge(allGames[index], winnerID);
  }
  for(let i = 0 ;i<allGames[index].players.length; i++){
    allGames[index].players[i].chosenResponse = null;
  }
  allGames[index].promptCard = null;
  return allGames[index].judgeID;
}

const selectFinalResponse = (gameID, playerID, card) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    logic.selectResponseCard(allGames[index], playerID, card);
  }
  return 0;
}

const getNumberOfThinkingPlayers = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if (index !== -1) {
    console.log("NOW NUMBER OF THINKING PLAYERS IS ", logic.getNumberOfThinkingPlayers(allGames[index]));
    return logic.getNumberOfThinkingPlayers(allGames[index]);
    
  }
  return -1;
}

const getPlayerCards = (gameID, playerID) => {
  console.log(gameID);
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return logic.getPlayerCards(allGames[index], playerID);
  }
  console.log("did not find the game");
  return -1;
}

const createGameIfNonExistant = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index === -1) {
    allGames.push(logic.createGame(gameID));
  }
  console.log("The game is stored at", getParticularGameIndex(gameID));
}

const addSettingsAndStart = async (gameID, decks, rounds) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    await logic.addSettingsToGame(allGames[index], decks, rounds);
    logic.startGame(allGames[index]);
  }
  return -1;
}

const getJudge = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return allGames[index].judgeID;
  }
  return -1;
}
const addPlayerToGame = (gameID, player) => {
  // Checks if they are part of the game already
  // If so then just set their information to active again
  const index = getParticularGameIndex(gameID);
  if (index === -1) return;
  let i = -1;
  for (i = 0; i < allGames[index].inactivePlayers.length; ++i) {
    _player = allGames[index].inactivePlayers[i]
    if (player._id === _player._id) {
      // Set that player to active and remove them from the
      allGames[index].players.push(_player);
      allGames[index].inactivePlayers.splice(i, 1);
      return 0;
      break;
    }
  }
  // If not add them to the game
  logic.addPlayerToGame(allGames[index], player)
  return 0;
}

const removePlayerFromGame = (gameID, playerID) => {
  // Set that player to inactive
  const index = getParticularGameIndex(gameID)
  if (index === -1) return;
  let i;
  for (i = 0; i < allGames[index].players.length; ++i) {
    player = allGames[index].players[i]
    player.chosenResponse = null;
    if (playerID=== player._id) {
      // Set that player to active
      allGames[index].inactivePlayers.push(player);
      break;
    }
  }

  // Remove that player from the actives list.
  console.log('before', allGames[index]);
  allGames[index].players.splice(i, 1);
  console.log('after', allGames[index]);
  return 0;
}

const incrementPlayerPoints = (gameID, winnerID) => {
  const index = getParticularGameIndex(gameID)
  if( index === -1) return;
  for(let i = 0; i<allGames[index].players.length; i++){
    player = allGames[index].players[i];
    if(winnerID === player._id){
      allGames[index].players[i].score += 1;
    }
  }
  return 0;
}

const checkMoreRounds = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if(index===-1){
    return;
  }
  console.log(allGames[index].rounds)
  allGames[index].rounds--;
  return allGames[index].rounds > 0;
}

const getLeaderboard = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  players = allGames[index].players;
  playerCopy = []
  retList = [];
  for(let i =0; i<players.length;i++){
    playerCopy.push(players[i]);
  }
  for(let i= 0; i<players.length; i++){
    maxIndex = 0;
    maxScore = 0;
    for(let j =0 ;j<playerCopy.length; j++){
      if(playerCopy[j].score > maxScore){
        maxScore = playerCopy[j].score;
        maxIndex = j;
      }
    }
    console.log(maxIndex, maxScore);
    retList.push(playerCopy.splice(maxIndex,1)[0]);
    console.log("retList: ", retList)
    console.log("playerList: ", playerCopy, "\n")
  }
  return retList;
}

module.exports = {
  getNewPromptCard,
  selectPromptCard,
  getChosenResponses,
  selectWinnerAndUpdateJudge,
  selectFinalResponse,
  getParticularGameIndex,
  incrementPlayerPoints,
  checkMoreRounds,
  getNumberOfThinkingPlayers,
  createGameIfNonExistant,
  addPlayerToGame,
  removePlayerFromGame,
  getJudge,
  addSettingsAndStart,
  getPlayerCards,
  getLeaderboard,
}