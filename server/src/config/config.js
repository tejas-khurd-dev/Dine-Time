require("dotenv").config();

const config = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL: process.env.SMTP_USER,
  EMAIL_PASSWORD: process.env.SMTP_PASS,
};

module.exports = config;
