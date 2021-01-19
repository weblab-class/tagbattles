const logic = require("./logic");

allGames = []

const getParticularGameIndex = (gameID) => {
  for (let i = 0; i < allGames.length; i++) {
    if (alLGames[i].gameID === ID) {
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
  return 0;
}

const selectWinner = (gameID, winnerID) => {
  const index = getParticularGameIndex(gameID)
  if (index !== -1) {
    logic.assignWinner(allGames[index], winnerID);
  }
  return 0;
}

module.exports = {
  getNewPromptCard,
  selectPromptCard,
  getChosenResponses,
  selectWinner,
}