const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config/config");
const blackListModel = require("../models/blackList.model");
const otpModel = require("../models/otp.model");
const userModel = require("../models/user.model");
const { sendOTP } = require("../services/sendMail.service");

const handleUserVerification = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({ msg: "username or email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await sendOTP(email, otp);

    const passwordHash = await bcrypt.hash(password, 10);

    await otpModel.create({
      username,
      email,
      otp,
      password: passwordHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    return res.status(201).json({ msg: "OTP Sent successfully" });
  } catch (error) {
    console.error("Error in handleUserVerification:", error);
    return res.status(500).json({ msg: "Failed to send OTP. Please try again." });
  }
};

const handleUserRegistration = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required" });
    }

    const otpData = await otpModel.findOne({ email, otp });

    if (!otpData) {
      return res.status(401).json({ msg: "Invalid or expired OTP" });
    }

    const user = await userModel.create({
      username: otpData.username,
      email: otpData.email,
      password: otpData.password,
    });

    await otpModel.deleteOne({ _id: otpData._id });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET);

    return res.status(201).json({
      msg: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in handleUserRegistration:", error);
    return res.status(500).json({ msg: "Registration failed. Please try again." });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "email not exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "incorrect password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        jti: crypto.randomUUID(),
      },
      config.JWT_SECRET
    );

    return res.status(200).json({ msg: "login successfully", token, user });
  } catch (error) {
    console.error("Error in handleUserLogin:", error);
    return res.status(500).json({ msg: "Login failed. Please try again." });
  }
};

const handleUserLogout = async (req, res) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = header.split("Bearer ")[1];

  await blackListModel.create({ token });

  return res.status(200).json({ msg: "Logout successful" });
};

const handleUserGetMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({ msg: "user fetch successful", user });
};

const handleUpdateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ msg: "Username is required" });
    }

    const existing = await userModel.findOne({
      username: username.trim(),
      _id: { $ne: req.user.id },
    });

    if (existing) {
      return res.status(409).json({ msg: "Username already taken" });
    }

    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { username: username.trim() },
      { returnDocument: "after" }
    );

    return res.status(200).json({ msg: "Username updated successfully", user });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ msg: "Failed to update username" });
  }
};

module.exports = {
  handleUserVerification,
  handleUserRegistration,
  handleUserLogin,
  handleUserLogout,
  handleUserGetMe,
  handleUpdateUsername,
};
