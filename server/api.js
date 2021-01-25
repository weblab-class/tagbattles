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

// Card
const Card = require("./models/card.js");

// Chat
const Chat = require("./models/chat.js");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  User.findOne({_id: req.user._id}).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  console.log("reached init socket")
  if (req.user) {
    console.log("HELLOOOO", req.body.socketid);
    User.findOne({_id: req.user._id}).then((user) => {
      console.log("INITSOCKET USER: ", user); console.log(socketManager.getSocketFromSocketID(req.body.socketid).id);
      socketManager.addUser(user, socketManager.getSocketFromSocketID(req.body.socketid));
    })
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

const utils = require('./utils.js');

router.get("/newGameID", (req, res) => {
  res.send({"gameID" : utils.getRandomID(6)});
});



router.post("/initGameSocket", auth.ensureLoggedIn, async (req, res) => {
  console.log(`initing the socket for ${req.body.socketid}, ${req.body.gameID}`);
  const socket = await socketManager.getSocketFromSocketID(req.body.socketid);
  if (socket) await socket.join(req.body.gameID, async () => {
    User.findOne({_id: req.user._id}).then(async (user) => {
      await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"msg": `${user.name} has joined!`, "type":"playerJoined"});
      console.log("INITGAMESOCKET USER: ",user);
      socketManager.addUserToRoom(user, req.body.gameID);

      await socketManager.getIo().in(req.body.gameID).clients((error, clients) => {
        socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {type:"playerList", players: gameManager.getPlayerList(req.body.gameID)});
      });
    });
  });
  res.send({});
});

router.post("/test", (req, res) => {
  console.log("HEY MANNN");
  res.send({socketid: req.body.socketid});
})

router.post("/testingsocket", auth.ensureLoggedIn, async (req, res) => {
  User.findOne({_id: req.user._id}).then(async (user) => {
    let socket = await socketManager.getSocketFromUserID(user._id);
    console.log(socket.rooms);
    console.log(req.body.gameID);
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"msg":"hey man"});
    res.send({});
  })
});


router.get('/getNewPromptCard', auth.ensureLoggedIn, async (req, res) => {
  const newCard = await gameManager.getNewPromptCard(req.query.gameID);
  res.send({card: newCard});
});

router.post('/selectPromptCard', auth.ensureLoggedIn, async (req, res) => {
  const promptCard = gameManager.selectPromptCard(req.body.gameID);
  await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': "displayCard", 'displayCard' : promptCard});
  res.send({});
});

router.get('/getSubmittedResponses', auth.ensureLoggedIn, async (req, res) => {
  const responses = await gameManager.getChosenResponses(req.query.gameID);
  res.send({'playerCards' : responses});
});

router.post('/selectWinnerAndUpdateJudge', auth.ensureLoggedIn, async (req, res) => {
  console.log("reached api");
  gameManager.incrementPlayerPoints(req.body.gameID, req.body.winnerID);
  if(gameManager.checkMoreRounds(req.body.gameID)){
    const newJudge = await gameManager.selectWinnerAndUpdateJudge(req.body.gameID, req.body.winnerID);
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'judgeUpdate', 'judgeID' : newJudge});
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': "displayCard", 'displayCard' : null});
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': "tentativeWinner", "card": null});
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': "reset"});
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'leaderboard', "leaderboard": gameManager.getLeaderboard(req.body.gameID)});
  }
  else{
    await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'gameEnded', "leaderboard": gameManager.getLeaderboard(req.body.gameID)});
  }
  res.send({})
});

router.post('/selectTentativeWinner', auth.ensureLoggedIn, async (req, res) => {
  console.log("reached api");
  const response = gameManager.getChosenResponse(req.body.gameID, req.body.playerID);
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': "tentativeWinner", "card": response});
});

router.post('/selectFinalResponse', auth.ensureLoggedIn, async (req, res) => {
  console.log('submitted card', req.body.cardIndex);
  gameManager.selectFinalResponse(req.body.gameID, req.body.playerID, req.body.cardIndex);
  const numberOfThinkingPlayers = gameManager.getNumberOfThinkingPlayers(req.body.gameID);
  console.log("in server thinking players", numberOfThinkingPlayers);
  // We want to send a socket out of the number of thinking players
  await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'numThinkingPlayers', 'numThinkingPlayers' : numberOfThinkingPlayers});
  res.send({});
})

// Also creates game. HAX
router.post('/addPlayer', auth.ensureLoggedIn, async (req, res) => {
  // If the game currently has nobody in it, we will call createGame
  console.log('started game creation')
  await gameManager.createGameIfNonExistant(req.body.gameID);
  console.log(`created game for ${req.body.player.name}`)
  
  if(gameManager.getPlayerList.length < 10){
    await gameManager.addPlayerToGame(req.body.gameID, {'_id' : req.body.player._id, 'name' : req.body.player.name})
    socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {"type": "updateHost", host:gameManager.getHost(req.body.gameID)});
    console.log("added player to game")
    res.send({status: "Success"});
  }
  else{
    res.send({status: "Game Full"});
  }
})

router.post('/startGame', auth.ensureLoggedIn, async (req, res) => {
  await gameManager.addSettingsAndStart(req.body.gameID, req.body.decks, req.body.rounds);
  // Get the first judge and send that out
  let newJudge = gameManager.getJudge(req.body.gameID)
  await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'judgeUpdate', 'judgeID' : newJudge});
  await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {'type': 'leaderboard', "leaderboard": gameManager.getLeaderboard(req.body.gameID)});
  res.send({});
})


router.get('/getDeckNames', (req, res) => {
  CardPack.find({}, {name:1, _id:0}).then((cardPackNames) => res.send(cardPackNames));
})

router.get('/getGameID', (req,res) => {
  res.send({index: gameManager.getParticularGameIndex(req.query.id)});
})

router.get('/getPlayerCards', auth.ensureLoggedIn, async (req, res) => {
  let responseCards = await gameManager.getPlayerCards(req.query.gameID, req.query.playerID);
  res.send({cards: responseCards}); 
}) 

router.get('/isNameUnique', (req, res) => {
  CardPack.find({'name' : req.query.name}).then((CardPack) => {
    if (CardPack.length > 0) {
      res.send({isUnique: false});
    }
    else {
      res.send({isUnique : true});
    }
  })
})
router.post('/createDeck', (req, res) => {
  const newDeck = new CardPack({
    name: req.body.name,
    prompt_cards : req.body.prompt_cards,
    response_cards: req.body.response_cards,
  })
  newDeck.save().then(()=> {res.send({}); console.log("added deck")})
  res.send({})
})
// player info

router.get("/getPlayer", (req, res) => {
  User.findOne({_id: req.query.userID}).then((player) => {
    res.send(player);
  })
})

router.get("/getName", (req, res) => {
  User.find({name: req.query.name}).then((player) => {
    res.send(player);
  })
})

router.post("/setPlayerHat", (req, res) => {
  User.updateOne({_id: req.body.userID}, {hatID: req.body.hatID}).then((data)=>{
    User.find({_id: req.body.userID}).then((user) => {
      console.log(user);
      res.send(user[0]);
    })
  });
})

router.post("/setPlayerColor", (req,res) => {
  User.updateOne({_id: req.body.userID}, {colorID: req.body.colorID}).then((data)=>{
    User.find({_id: req.body.userID}).then((user) => {
      console.log(user);
      res.send(user[0]);
    })
  });
})

router.post("/setPlayerMouth", (req,res) => {
  User.updateOne({_id: req.body.userID}, {mouthID: req.body.mouthID}).then((data)=>{
    User.find({_id: req.body.userID}).then((user) => {
      console.log(user);
      res.send(user[0]);
    })
  });
})

router.post("/setPlayerEye", (req,res) => {
  User.updateOne({_id: req.body.userID}, {eyeID: req.body.eyeID}).then((data)=>{
    User.find({_id: req.body.userID}).then((user) => {
      console.log(user);
      res.send(user[0]);
    })
  });
})

router.post("/incrementPlayerWins", (req, res) => {
  User.find({userID: req.user._id}).then((players) => {
    if(players.length === 0){
      res.send({message: "no such player"});
    }
    else{
      User.updateOne({_id: req.body.userID}, {gameWins: players[0].gameWins+1}).then((data) => {
        res.send(data);
      })
    }
  }).catch((error)=>{
    console.log(error);
    res.send({});
  })
})

router.post("/updateRounds", (req, res) => {
  const newRounds = gameManager.updateGameRounds(req.body.gameID, req.body.rounds);
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {type: "roundsUpdate", rounds: newRounds});
  res.send({newRounds});
})

router.post("/updateDeck", (req, res) => {
  const newDeck = gameManager.updateGameDeck(req.body.gameID, req.body.deck);
  socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {type: "deckUpdate", deck: newDeck});
  res.send({newDeck});
})

router.get("/getRounds", (req, res) => {
  res.send({rounds: gameManager.getGameRounds(req.query.gameID)});
})

router.get("/getDeck", (req, res) => {
  res.send({deck: gameManager.getGameDeck(req.query.gameID)})
})

router.get("/getChatMessages", (req, res) => {
  res.send({chat: gameManager.getChat(req.query.gameID)});
})

router.post("/postChatMessage", async (req, res) => {
  await gameManager.addToChat(req.body.gameID, req.body.userID, req.body.message, req.body.name);
  console.log("Current Chat: ", gameManager.getChat(req.body.gameID));
  await socketManager.getIo().to(req.body.gameID).emit("gameUpdate", {type: "chatUpdate", chat: {userID: req.body.userID, message: req.body.message, name: req.body.name}});
  console.log("message: ", req.body.message);
  res.send({message: req.body.message});
})

router.post("/postNewBio", (req, res) => {
  User.updateOne({_id: req.body.userID}, {bio: req.body.bio}).then((data) => {
    User.find({_id: req.body.userID}).then((user) => {
      console.log(user);
      res.send({bio: user[0].bio});
    })
  })
})

router.get("/getBio", (req, res) => {
  User.find({_id: req.body.userID}).then((user) => {
    console.log(user);
    res.send({bio: user[0].bio});
  })
})

/*router.get("/getPlayerChats", (req, res) => {
  Chat.find({$or: [{"sender._id": req.body.userID}, {"recipient._id": req.body.userID}]}.then((chats) => {
    uniqueUsers = [];
    map = {};
    for(let i = 0; i<chats.length; i++){
      if(chats.sender._id === req.body.userID){
        map[chats.recipient._id] = chats.recipient.name;
      }
      else{
        map[chats.sender._id] = chats.recipient.name;
      }
    }
    for(let id in map){
      if(Object.prototype.hasOwnProperty.call(map, id)){
        uniqueUsers.push({id: id,name: map[id]})
      }
    }
    res.send({users: uniqueUsers})
  }))
})*/

router.post("/postNewName", (req, res) => {
  console.log("ASDGDASGAD:", req.body.name, req.body.userID);
  User.updateOne({_id: req.body.userID}, {name: req.body.name}).then((a) => {
    User.find({_id: req.body.userID}).then((user)=>{
      res.send({newUser: user[0]});
    })
  })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
