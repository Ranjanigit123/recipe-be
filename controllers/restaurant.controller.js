// controllers/restaurant.controller.js

const RestaurantModel = require("../models/restaurant.model");

const getRestaurantsByFilters = async (req, res) => {
    console.log("request body is", req.body);
    try {
        const { category, rating, cuisines } = req.body;
        const query = {};
        if (category) {
            query.category = category;
        }

        if (rating?.length > 0) {
            if (rating == 3) {
                query.rating = { $gte: 3, $lte: 5 };
            } else {
                query.rating = { $gte: 4, $lte: 5 };
            }
        }

        if (cuisines?.length > 0) {
            query.cuisines = { $in: cuisines };
        }

        const restaurants = await RestaurantModel.find(query);
        if (restaurants.length > 0) {
            res.json({ success: true, data: restaurants });
        } else {
            res.json({ success: false, message: "No such data found!" });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};
const searchRecipes = async (req, res) => {
    try {
        const { query } = req;
        const { keyword, recipename, ingredients, foodtype } = query;
        const searchQuery = {};

        if (recipename) {
            searchQuery.recipename = new RegExp(recipename, "i");
        }

        if (ingredients) {
            searchQuery.ingredients = new RegExp(ingredients, "i");
        }

        if (foodtype) {
            searchQuery.foodtype = new RegExp(foodtype, "i");
        }

        if (keyword) {
            searchQuery.$or = [
                { recipename: new RegExp(keyword, "i") },
                { ingredients: new RegExp(keyword, "i") },
                { foodtype: new RegExp(keyword, "i") },
                { category: new RegExp(keyword, "i") },
            ];
        }

        const results = await RestaurantModel.find(searchQuery);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { searchRecipes };
module.exports = { getRestaurantsByFilters };
