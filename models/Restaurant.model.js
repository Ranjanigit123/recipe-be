// models/restaurant.model.js

const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    recipename: String,
    description: String,
    ingredients: String,
    instructions: String,
    preparationtime: String,
    servingsize: String,
    category: String,
    foodtype: String,
    rating: Number,
    offers: Boolean,
    cuisines: [String],
    image: String,
});

module.exports = mongoose.model("restaurant", restaurantSchema);
