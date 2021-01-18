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
    socketManager.addUser(req.user, req.body.socketid);
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



router.post("/initGameSocket", auth.ensureLoggedIn, (req, res) => {
  if (req.user) {
    console.log(`initing the socket for ${req.body.socketid}, ${req.body.gameID}`);
    socketManager.getSocketFromSocketID(req.body.socketid).join(req.body.gameID, () => socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"msg": `${req.user.name} has joined!`}));
  }
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

router.post('/selectCard', (req, res) => {
  gameManager.selectPromptCard(req.body.gameID, req.body.card);
  res.send({});
});

router.get('/getSubmittedResponses', (req, res) => {
  const responses = gameManager.getChosenResponses(req.gameID);
  res.send({'playerCards' : responses});
});

router.post('/selectWinner', (req, res) => {
  gameManager.selectWinner(req.body.gameID, req.body.winnerID);
  res.send({});
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});



module.exports = router;
