const jwt = require("jsonwebtoken");
const config = require("../config/config");
const blackListModel = require("../models/blackList.model");

const authUserMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = header.split("Bearer ")[1];

  const isTokenExists = await blackListModel.findOne({ token });

  if (isTokenExists) {
    return res.status(401).json({ msg: "Token already blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "invalid token" });
  }
};

module.exports = { authUserMiddleware };
