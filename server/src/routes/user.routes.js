const express = require("express");
const { handleUpdateUser } = require("../controllers/user.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.put("/updateUserInfo", authUserMiddleware, handleUpdateUser);

module.exports = userRouter;
