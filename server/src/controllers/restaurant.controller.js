const mongoose = require("mongoose");
const restaurantModel = require("../models/restaurant.model");
const restaurantDetailModel = require("../models/restaurantDetail.model");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find().sort({ createdAt: 1 });
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching restaurants",
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    let restaurant;

    if (mongoose.Types.ObjectId.isValid(id)) {
      restaurant = await restaurantModel.findById(id);
    } else {
      restaurant = await restaurantModel.findOne({ id });
    }

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const detail = await restaurantDetailModel.findOne({ restaurant: restaurant._id });

    return res.status(200).json({
      ...restaurant.toObject(),
      detail: detail || null,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching restaurant",
    });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
};
