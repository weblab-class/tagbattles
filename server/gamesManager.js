const logic = require("./logic");

allGames = []

const getParticularGameIndex = (gameID) => {
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].gameID === ID) {
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
    logic.assignPromptCard(allGames[index], card)
  }
  return 0;
}

const getChosenResponses = (gameID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    let responses =  allGames[index].players.map(
      (player) => {
        return {'playerID' : player._id, card:player.chosenResponse}
      }
    );
    return responses;
  }
  return [];
}

const selectWinnerAndUpdateJudge = (gameID, winnerID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    logic.assignWinnerAndUpdateJudge(allGames[index], winnerID);
  }
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
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    return logic.getNumberOfThinkingPlayers(allGames[index]);
  }
  return -1;
}

const createGame = (gameID, decks, players, rounds) => {
  allGames.push(logic.createGame(gameID, decks, players, rounds));
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
      // Set that player to active
      allGames[index].players.push(_player);
      break;
    }
  }
  if (i === -1) {
    // Remove the player from the inactive players list
    allGames[index].inactivePlayers.splice(i, 1);
    return 0;
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
    if (playerID=== player._id) {
      // Set that player to active
      allGames[index].inactivePlayers.push(player);
      break;
    }
  }

  // Remove that player from the actives list.
  allGames[index].players.splice(i, 1);
  return 0;
}

module.exports = {
  getNewPromptCard,
  selectPromptCard,
  getChosenResponses,
  selectWinnerAndUpdateJudge,
  selectFinalResponse,
  getNumberOfThinkingPlayers,
  createGame,
  addPlayerToGame,
  removePlayerFromGame,
  getJudge
}