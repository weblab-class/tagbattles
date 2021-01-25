const gameManager = require('./gamesManager.js');
let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const socketToRoomMap = {}; // maps socket id to room id
const roomToSocketsMap = [];

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
    delete socketToRoomMap[oldSocket.id];
  }
  console.log(`now ${user.name} has ${socket.id}`)
  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const addUserToRoom = (user, roomid) => {
  if (user && getSocketFromUserID(user._id)) {
    socketToRoomMap[getSocketFromUserID(user._id).id] = roomid;
  }
}

const removeUser = (user, socket) => {
  if (user) {
    delete userToSocketMap[user._id];
  }
  delete socketToRoomMap[socket._id];
  delete socketToUserMap[socket.id];
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id), room = socketToRoomMap[socket.id];
        // console.log(user.name);
        io.in(room).clients(async (error, clients) => {
          if (error) console.log(error);
          // console.log(clients.map(socket => getUserFromSocketID(socket.id)));
          if (user) console.log("DISCONNECT", user._id, room);
          if (user) await gameManager.removePlayerFromGame(room, user._id);
          await io.to(room).emit("gameUpdate", {type:"playerList",players:clients.map(socketid => getUserFromSocketID(socketid))});
          await io.to(room).emit("gameUpdate", {type:"updateHost", host:gameManager.getHost(room)})
          removeUser(user, socket);
        });
        console.log(`player has disconnected from room ${room}`);
        
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,
  addUserToRoom: addUserToRoom,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
