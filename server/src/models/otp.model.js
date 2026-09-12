const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: String, required: true },
    password: { type: String, required: true },
    expiresAt: { type: Date, required: true, expires: 0 },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("OTP", otpSchema);

module.exports = otpModel;
