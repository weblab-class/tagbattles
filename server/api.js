/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// game logic manager
const gameManager = require("./gamesManager.js")

// Card packs
const CardPack = require("./models/card_pack.js");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  console.log("reached init socket")
  if (req.user) {
    console.log("HELLOOOO", req.body.socketid);
    console.log(req.user); console.log(socketManager.getSocketFromSocketID(req.body.socketid).id);
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

const utils = require('./utils.js');

router.get("/newGameID", (req, res) => {
  if (!req.user) res.status(403).send({msg: "Hey, what are you doing here? Go login and play!"});
  else {
    res.send({"gameID" : utils.getRandomID(6)});
  }
});



router.post("/initGameSocket", auth.ensureLoggedIn, async (req, res) => {
  console.log(`initing the socket for ${req.body.socketid}, ${req.body.gameID}`);
  const socket = socketManager.getSocketFromSocketID(req.body.socketid);
  socket.join(req.body.gameID, () => {

    socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"msg": `${req.user.name} has joined!`, "type":"playerJoined"});

    socketManager.addUserToRoom(req.user, req.body.gameID);

    socketManager.getIo().in(req.body.gameID).clients((error, clients) => {
      socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {type:"playerList", players:clients.map(socketid => socketManager.getUserFromSocketID(socketid))});
    });
  });
  res.send({});
});

router.post("/test", (req, res) => {
  console.log("HEY MANNN");
  res.send({socketid: req.body.socketid});
})

router.post("/testingsocket", auth.ensureLoggedIn, (req, res) => {
  let socket = socketManager.getSocketFromUserID(req.user._id);
  console.log(socket.rooms);
  console.log(req.body.gameID);
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"msg":"hey man"});
  res.send({});
});


router.get('/getNewPromptCard', (req, res) => {
  const newCard = gameManager.getNewPromptCard(req.query.gameID);
  res.send({card: newCard});
});

router.post('/selectPromptCard', (req, res) => {
  gameManager.selectPromptCard(req.body.gameID, req.body.card);
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'displayCard', 'displayCard' : req.body.card});
  res.send({});
});

router.get('/getSubmittedResponses', (req, res) => {
  const responses = gameManager.getChosenResponses(req.query.gameID);
  res.send({'playerCards' : responses});
});

router.post('/selectWinnerAndUpdateJudge', (req, res) => {
  console.log("reached api");
  gameManager.incrementPlayerPoints(req.body.gameID, req.body.winnerID);
  if(gameManager.checkMoreRounds(req.body.gameID)){
    const newJudge = gameManager.selectWinnerAndUpdateJudge(req.body.gameID, req.body.winnerID);
    socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'judgeUpdate', 'judgeID' : newJudge});
  }
  else{
    socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'gameEnded', "leaderboard": gameManager.getLeaderboard(req.body.gameID)});
  }
  res.send({})
});

router.post('/selectFinalResponse', (req, res) => {
  gameManager.selectFinalResponse(req.body.gameID, req.body.playerID, req.body.card);
  const numberOfThinkingPlayers = gameManager.getNumberOfThinkingPlayers(req.body.gameID);
  console.log("insserver", numberOfThinkingPlayers);
  // We want to send a socket out of the number of thinking players
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'numThinkingPlayers', 'numThinkingPlayers' : numberOfThinkingPlayers});
})

// Also creates game. HAX
router.post('/addPlayer', (req, res) => {
  // If the game currently has nobody in it, we will call createGame
  console.log('started game creation')
  gameManager.createGameIfNonExistant(req.body.gameID);
  console.log("created game")
  
  gameManager.addPlayerToGame(req.body.gameID, {'_id' : req.body.player._id, 'name' : req.body.player.name})
  console.log("added player to game")
  res.send({})
})

router.post('/startGame', async (req, res) => {
  await gameManager.addSettingsAndStart(req.body.gameID, req.body.decks, req.body.rounds);
  // Get the first judge and send that out
  let newJudge = gameManager.getJudge(req.body.gameID)
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'judgeUpdate', 'judgeID' : newJudge});
  res.send({});
})


router.get('/getDeckNames', (req, res) => {
  CardPack.find({}, {name:1, _id:0}).then((cardPackNames) => res.send(cardPackNames));
})


router.get('/getPlayerCards', (req, res) => {
  let responseCards = gameManager.getPlayerCards(req.query.gameID, req.query.playerID);
  res.send({cards: responseCards}); 
}) 

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
