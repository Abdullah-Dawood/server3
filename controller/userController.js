const User = require("../model/userProfile");
const { createToken, verifyToken } = require("../middleware/jwt");
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userProfile = await User.Login(username, password);
    const token = createToken(userProfile._id, userProfile.username);
    res
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(200)
      .json({ userProfile, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const userSignup = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const userProfile = await User.Signup(username, password);
    const token = createToken(userProfile._id, userProfile.username);

    res
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(200)
      .json({ userProfile });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const checkProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const userID = verifyToken(token);
    res.status(200).json({ userID });
  }
};

module.exports = {
  userLogin,
  userSignup,
  checkProfile,
};
