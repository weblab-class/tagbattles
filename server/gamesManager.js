const logic = require("./logic");

allGames = []

const getParticularGameIndex = (gameID) => {
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].gameID == gameID) {
      return i;
    }
  }
  return -1;
}

const getNewPromptCard = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return logic.getNewPromptCard(allGames[index])
  }
  return -1;
}

const selectPromptCard = (gameID, card) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    allGames[index].isPromptSelected = true;
    return allGames[index].promptCard;
  }
  return 0;
}

const getChosenResponses = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    let responses = []
    for (let i = 0; i < allGames[index].players.length; i++) {
      player = allGames[index].players[i]
      if (player.chosenResponse && player._id != allGames[index].judgeID) {
        responses.push({'playerID' : player._id, card:player.chosenResponse})
      }
    }
    return responses;
  }
  return [];
}


const getChosenResponse = (gameID, playerID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    for (let i = 0; i < allGames[index].players.length; i++) {
      player = allGames[index].players[i]
      if (player.chosenResponse && player._id == playerID) {
        return player.chosenResponse
      }
    }
  }
  return {card: null};
}

const selectWinnerAndUpdateJudge = async (gameID, winnerID) => {
  const index = getParticularGameIndex(gameID)
  if (index === -1) {
    return
  }
  if(allGames[index].currentRound.length === 0){
    allGames[index].round += 1;
    await logic.beginNewRound(allGames[index]);
  }
  await logic.assignWinnerAndUpdateJudge(allGames[index], winnerID);
  for(let i = 0 ;i<allGames[index].players.length; i++){
    allGames[index].players[i].chosenResponse = null;
  }
  allGames[index].promptCard = null;
  console.log("Current Round Players: ", allGames[index].currentRound);
  console.log("Current Round: ", allGames[index].round);
  return allGames[index].judgeID;
}

const selectFinalResponse = (gameID, playerID, cardIndex) => {
  //console.log(cardIndex, "index");
  if (cardIndex > 10 || cardIndex <= 0) return 0;
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    logic.selectResponseCard(allGames[index], playerID, cardIndex);
  }
  return 0;
}

const getNumberOfThinkingPlayers = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if (index !== -1) {
    //console.log("NOW NUMBER OF THINKING PLAYERS IS ", logic.getNumberOfThinkingPlayers(allGames[index]));
    return logic.getNumberOfThinkingPlayers(allGames[index]);
    
  }
  return -1;
}

const getPlayerCards = (gameID, playerID) => {
  //console.log(gameID);
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return logic.getPlayerCards(allGames[index], playerID);
  }
  //console.log("did not find the game");
  return -1;
}

const createGameIfNonExistant = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index === -1) {
    console.log("wowow game didn't exists. created one");
    allGames.push(logic.createGame(gameID));
  }
}

const addSettingsAndStart = async (gameID, decks, rounds) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    await logic.addSettingsToGame(allGames[index], decks, rounds);
    await logic.startGame(allGames[index]);
  }
  return -1;
}

const getJudge = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return allGames[index].judgeID;
  }
  return null;
}
const addPlayerToGame = (gameID, player) => {
  // Checks if they are part of the game already
  // If so then just set their information to active again
  const index = getParticularGameIndex(gameID);
  if (index === -1) return;
  let i = -1;
  for (i = 0; i < allGames[index].inactivePlayers.length; ++i) {
    _player = allGames[index].inactivePlayers[i]
    if (player._id == _player._id) {
      // Set that player to active and remove them from the
      if(_player.roundCounter === allGames[index].roundCounter){
        // If the player has not chosen a card for this round before they left, reset their chosenResponse
        _player.chosenResponse = null;
      }
      allGames[index].players.push(_player);
      
      let alreadyGone = false;
      for(let j =0 ;j<allGames[index].currentRoundGone.length; j++){
        if(player._id == allGames[index].currentRoundGone[j]){
          alreadyGone = true;
        }
      }
      if(!alreadyGone){
        allGames[index].currentRound.push(allGames[index].inactivePlayers.splice(i, 1));
      }
      return 0;
    }
  }
  // If not add them to the game
  logic.addPlayerToGame(allGames[index], player)
  console.log(`added player ${player.name} to the game. now the game has ${allGames[index].players.length} players`);
  // Set host if only one player
  if(allGames[index].players.length === 1){
    //console.log("Place 2: ",player._id);
    allGames[index].host = player._id;
  }
  return 0;
}

const getPromptCard = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return allGames[index].promptCard;
  }
  return null;
}

const removePlayerFromGame = (gameID, playerID) => {
  // Set that player to inactive
  const index = getParticularGameIndex(gameID)
  console.log("REMOVING ", playerID, " from ", gameID);
  if (index === -1) {return false;}
  let i;
  for (i = 0; i < allGames[index].players.length; ++i) {
    player = allGames[index].players[i]
    if (playerID== player._id) {
      player.chosenResponse = null;
      // Set that player to active
      allGames[index].inactivePlayers.push(player);
      break;
    }
  }
  //console.log('removed player')
  // Remove that player from the actives list.
  console.log('before', allGames[index].players.map(player => player.name));
  console.log('index', i)
  allGames[index].players.splice(i, 1);
  console.log('after', allGames[index].players.map(player => player.name));
  
  //Assign new host if player was host and game is still going
  if(allGames[index].players.length > 0 && playerID == allGames[index].host){
    //console.log("Going into if statement");
    //console.log(allGames[index].players, Math.floor(allGames[index].players.length * Math.random()));
    allGames[index].host = allGames[index].players[Math.floor(allGames[index].players.length * Math.random())]._id;
    //console.log(allGames[index].host);
    socketManager.getIo().to(gameID).emit("gameUpdate", {type:"updateHost", host:allGames[index].host})
  }
  // Removes user from socket
  const socketID = socketManager.getSocketFromUserID(playerID);
  socketManager.removeUser({_id: playerID}, {_id: socketID});

  // if (!allGames[index].isActive) {
  //   console.log("Well, if you read this, you are f'd up");
  //   return;
  // }
  //If the number of active players is now < 1 we want to send a gameOver screen
  if (allGames[index].isActive && allGames[index].players.length <= 1) {
    console.log("Game ended. YAY!");
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': 'gameEnded', "leaderboard": getLeaderboard(gameID)});
   return ;
  }

  // If they are the judge then we want to reassign.
  if (allGames[index].isActive && allGames[index].judgeID == playerID) {
    // Now we have to do some fancy judge reassigning here
    const newJudge = logic.updateJudge(allGames[index]);

    // We also want to send this reassigned judge back to the players:
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': 'judgeUpdate', 'judgeID' : newJudge});
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': "displayCard", 'displayCard' : null});
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': "tentativeWinner", "card": null});
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': "reset"});
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': 'leaderboard', "leaderboard": getLeaderboard(gameID)});
  }

  if (allGames[index].isActive) {
    // Additionally we want to send back a numThinkingPlayers.
    const numberOfThinkingPlayers = getNumberOfThinkingPlayers(gameID);
    // We want to send a socket out of the number of thinking players
    socketManager.getIo().to(gameID).emit("gameUpdate", {'type': 'numThinkingPlayers', 'numThinkingPlayers' : numberOfThinkingPlayers});
  }

  // Sends the player list out
  console.log("IM ACTUALLY SENDING THE PLAYERLIST");
  socketManager.getIo().to(gameID).emit("gameUpdate", {type:"playerList",players:allGames[index].players});
}

const shouldReset = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  if(allGames[index].reset){
    allGames[index].reset = false;
    return true;
  }
  return false;
}

const getHost = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  return allGames[index].host;
}

const incrementPlayerPoints = (gameID, winnerID) => {
  const index = getParticularGameIndex(gameID)
  if( index === -1) return;
  for(let i = 0; i<allGames[index].players.length; i++){
    player = allGames[index].players[i];
    if(winnerID == player._id){
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
  //console.log(allGames[index].rounds)
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
    //console.log(maxIndex, maxScore);
    retList.push(playerCopy.splice(maxIndex,1)[0]);
    //console.log("retList: ", retList)
    //console.log("playerList: ", playerCopy, "\n")
  }
  return retList;
}

const updateGameRounds = (gameID, numRounds) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  allGames[index].rounds = numRounds;
  //console.log("gameIDadsgadsg:", gameID);
  return allGames[index].rounds;
}

const updateGameDecks = (gameID, decks) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  allGames[index].decks = decks;
  return allGames[index].decks;
}

const getGameDecks = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index===-1){
    return;
  }
  return allGames[index].decks;
}

const getGameRounds = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index===-1){
    return;
  }
  //console.log("gameIDASD a:", gameID)
  return allGames[index].rounds;
}

const getGameStatus = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return "Oh no";
  }
  if(allGames[index].status === "inSession"){
    return "player";
  }
  return allGames[index].status;
}

const getPlayerStatus = (gameID, playerID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  for(let i = 0; i<allGames[index].players.length; i++){
    if(allGames[index].players[i]._id === playerID){
      return allGames[index].players[i].chosenResponse ? "submitted" : "selecting";
    }
  }
  return "NA";
}

const addToChat = (gameID, userID, message, name) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  allGames[index].chat.push({userID: userID, message: message, name:name});
}

const getChat = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return;
  }
  return allGames[index].chat;
}

const getPlayerList = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return [];
  }
  //console.log("WTF IS GOING ON HERE MAN!!!", allGames[index].players);
  return allGames[index].players || [];
}

const isStarted = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index === -1){
    return ;
  }
  return allGames[index].isActive;
}

const isDisplayCardRevealed = (gameID) => {
  const index = getParticularGameIndex(gameID);
  if(index !== -1){
    return allGames[index].isPromptSelected;
  }
  return false;
}


module.exports = {
  getNewPromptCard,
  selectPromptCard,
  getPlayerStatus,
  getGameStatus,
  getChosenResponses,
  getChosenResponse,
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
  getHost,
  updateGameRounds,
  shouldReset,
  updateGameDecks,
  getGameDecks,
  getGameRounds,
  addToChat,
  getChat,
  getPlayerList,
  isStarted,
  getPromptCard,
  isDisplayCardRevealed
}


const socketManager = require("./server-socket"); // This is only used in removePlayerFromGame. Fix later by sending to different file.