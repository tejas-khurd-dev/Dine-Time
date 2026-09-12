const mongoose = require("mongoose");

const restaurantDetailSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    image1: { type: String },
    image1FileId: { type: String },
    image2: { type: String },
    image2FileId: { type: String },
    image3: { type: String },
    image3FileId: { type: String },
    image4: { type: String },
    image4FileId: { type: String },
    image5: { type: String },
    image5FileId: { type: String },
    image6: { type: String },
    image6FileId: { type: String },
    menu: {
      type: mongoose.Schema.Types.Mixed,
      default: { starters: [], mainCourse: [], desserts: [] },
    },
  },
  { timestamps: true }
);

const restaurantDetailModel = mongoose.model(
  "RestaurantDetails",
  restaurantDetailSchema
);

module.exports = restaurantDetailModel;
