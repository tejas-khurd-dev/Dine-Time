const express = require("express");
const {
  getAllRestaurants,
  getRestaurantById,
} = require("../controllers/restaurant.controller");

const restaurantRouter = express.Router();

restaurantRouter.get("/", getAllRestaurants);

restaurantRouter.get("/:id", getRestaurantById);

module.exports = restaurantRouter;
