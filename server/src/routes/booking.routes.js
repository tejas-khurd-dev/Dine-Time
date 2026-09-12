const express = require("express");
const {
  handleCreateBooking,
  getAvailableSlots,
  getUserBookings,
} = require("../controllers/booking.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const bookingRouter = express.Router();

bookingRouter.post("/create", authUserMiddleware, handleCreateBooking);

bookingRouter.get("/slots/:restaurantId/:date", getAvailableSlots);

bookingRouter.get("/my-bookings", authUserMiddleware, getUserBookings);

module.exports = bookingRouter;
