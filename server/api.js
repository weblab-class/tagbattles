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
  if (req.user) {
    console.log(req.body.socketid);
    // console.log(socketManager.getSocketFromSocketID(req.body.socketid).id);
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
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
  socketManager.getSocketFromSocketID(req.body.socketid).join(req.body.gameID, () => {

    socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"msg": `${req.user.name} has joined!`, "type":"playerJoined"});

    socketManager.addUserToRoom(req.user, req.body.gameID);

    socketManager.getIo().in(req.body.gameID).clients((error, clients) => {
      socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {type:"playerList", players:clients.map(socketid => socketManager.getUserFromSocketID(socketid))});
    });
  });
});

router.post("/test", (req, res) => {
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
  const newCard = gameManager.getNewPromptCard(req.gameID);
  res.send({card: newCard});
});

router.post('/selectPromptCard', (req, res) => {
  gameManager.selectPromptCard(req.body.gameID, req.body.card);
  socketManager.getIo().to(req.body.gameID).emit({'type': 'displayCard', 'displayCard' : req.body.card});
  res.send({});
});

router.get('/getSubmittedResponses', (req, res) => {
  const responses = gameManager.getChosenResponses(req.gameID);
  res.send({'playerCards' : responses});
});

router.post('/selectWinnerAndUpdateJudge', (req, res) => {
  const newJudge = gameManager.selectWinnerAndUpdateJudge(req.body.gameID, req.body.winnerID);
  socketManager.getIo().to(req.body.gameID).emit({'type': 'judgeUpdate', 'judgeID' : newJudge});
});

router.post('/selectFinalResponse', (req, res) => {
  gameManager.selectFinalResponse(req.body.gameID, req.body.playerID, req.body.card);
  const numberOfThinkingPlayers = gameManager.getNumberOfThinkingPlayers(req.body.gameID);
  // We want to send a socket out of the number of thinking players
  socketManager.getIo().to(req.body.gameID).emit({'type': 'numThinkingPlayers', 'numThinkingPlayers' : numberOfThinkingPlayers});
})

router.post('/startGame', (req, res) => {
  gameManager.createGame(req.body.gameID, req.body.decks, req.body.players, req.body.rounds);
})

router.get('/getDeckNames', (req, res) => {
  CardPack.find({}, {name:1, _id:0}).then((cardPackNames) => res.send(cardPackNames));
})

router.post('/addPlayer', (req, res) => {
  // This should be where we add players.
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
