const express = require("express");
const {
  handleUserVerification,
  handleUserRegistration,
  handleUserLogin,
  handleUserLogout,
  handleUserGetMe,
  handleUpdateUsername,
} = require("../controllers/auth.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/send-otp", handleUserVerification);
authRouter.post("/register", handleUserRegistration);
authRouter.post("/login", handleUserLogin);
authRouter.get("/logout", handleUserLogout);
authRouter.get("/get-me", authUserMiddleware, handleUserGetMe);
authRouter.put("/update-username", authUserMiddleware, handleUpdateUsername);

module.exports = authRouter;
