const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");
const nums = ['0', '1','2','3','4','5','6','7','8','9'];

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser){
      console.log("EXISTING USER: ",existingUser);
      return existingUser;
    }
    return User.findOne({ name: user.name }).then((prevUser)=>{
      if(prevUser){
        user.name += nums[Math.floor(Math.random()*10)];
        user.name += nums[Math.floor(Math.random()*10)];
        user.name += nums[Math.floor(Math.random()*10)];
      }

      if(user.name.length > 20){
        user.name = user.name.substring(0,18);
        user.name += nums[Math.floor(Math.random()*10)];
        user.name += nums[Math.floor(Math.random()*10)];
        user.name += nums[Math.floor(Math.random()*10)];
      }

      const newUser = new User({
        name: user.name,
        googleid: user.sub,
        hatID: getRandomNumber(5),
        mouthID: getRandomNumber(6),
        colorID: getRandomNumber(11),
        eyeID: getRandomNumber(4),
        bio: "",
        favCard: "",
        gameWins: 0,
      });

      return newUser.save();
    })
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
