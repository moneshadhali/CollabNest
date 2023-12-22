const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  //_id is the payload of the token
  //payload should not be sensitive data
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    //create a token
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
