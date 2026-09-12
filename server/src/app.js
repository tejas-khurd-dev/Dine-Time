require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const restaurantRouter = require("./routes/restaurant.routes");
const bookingRouter = require("./routes/booking.routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("server is live"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/booking", bookingRouter);

module.exports = app;
