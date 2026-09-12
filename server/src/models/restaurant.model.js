const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    distance: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const restaurantModel = mongoose.model("Restaurants", restaurantSchema);

module.exports = restaurantModel;
