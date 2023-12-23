const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware functions
// fires for every single routes before controller functions
// And check if user who is requesting is authenticated
// To do that - server need to check if the user has the right jwt (json web token)
// True only when jwt is valid and not altered

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not Authorization" });
  }
};

module.exports = requireAuth;
