const jwt = require("jsonwebtoken");
const createToken = (_id, username) => {
  return jwt.sign({ id: _id, username: username }, process.env.SECRET, {
    expiresIn: "2d",
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};
module.exports = { createToken, verifyToken };
