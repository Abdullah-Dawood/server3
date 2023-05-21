const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.Login = async function (username, password) {
  if (!username || !password) {
    throw new Error("All fields are required!");
  }
  const searchUser = await this.findOne({ username });
  if (!searchUser) {
    throw new Error("No such user exist!");
  }
  const comparePass = await bcrypt.compare(password, searchUser.password);
  if (!comparePass) {
    throw new Error("Password is incorrect!");
  }
  return searchUser;
};
userSchema.statics.Signup = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields are required!");
  }
  const user = await this.findOne({ username });
  if (user) {
    throw new Error("Username already exist!");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const addUser = await this.create({ username, password: hash });
  if (!addUser) {
    throw new Error("Error while creating new user!");
  } else return addUser;
};

module.exports = mongoose.model("User", userSchema);
