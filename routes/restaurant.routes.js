// routes/restaurant.route.js

const express = require("express");
const router = express.Router();
 

const { getRestaurantsByFilters } = require("../controllers/restaurant.Controller");

router.route("/restaurants").post(getRestaurantsByFilters);
router.get("/search", searchRecipes);

module.exports = router;
