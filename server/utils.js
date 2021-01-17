const alphabet = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
const alphabetSize = alphabet.length;

const getRandomID = (length) => {
  let randomID = "";
  for (let i = 0; i < length; i++) {
    randomID += alphabet[Math.floor(Math.random() * alphabetSize)];
  }
  return randomID;
}

module.exports = {
  getRandomID,
}