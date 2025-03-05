//index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const MONGO_URL = "mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/RECIPEAPP?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        seedRestaurantData();
        startServer();
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
    });

// Define the restaurant model
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
const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

async function seedRestaurantData() {
    await RestaurantModel.deleteMany({});

    const restaurantData = [
        {
            recipename: "Chicken Briyani",
            description: "Spice up your day with our irresistibly flavorful Chicken Biryani—one bite, you're hooked!✨",
            ingredients: "Chicken, Basmati rice, Yogurt, Onions, Garlic & ginger paste, Whole spices, Ground spices,Ghee or oil",
            instructions: "Marinate Chicken: Mix chicken with yogurt, ginger-garlic paste, red chili powder, turmeric, garam masala, salt, lemon juice, and fresh herbs. Let it rest for 30 minutes. Prepare Rice: Wash and soak basmati rice for 20 minutes. Boil water with whole spices (bay leaf, cardamom, cloves, cinnamon), add rice, cook until 70% done, and drain. Cook Chicken: Heat ghee/oil, fry sliced onions until golden brown. Add marinated chicken and cook until tender. Add chopped tomatoes and biryani masala. Layering: In a pot, layer half-cooked rice over the chicken. Top with fried onions, mint, coriander, and saffron-infused milk. Drizzle ghee. Dum Cooking: Cover tightly and cook on low heat for 20-25 minutes until flavors blend. Serve: Fluff the biryani gently and serve hot with raita! 😋",
            preparationtime: "60mins",
            servingsize:"4",
            category:"Lunch",
            foodtype:"Non-veg",
            rating: 5,
            offers: true,
            cuisines: ["South Indian"],
            //cuisines: ["South Indian", " Chicken Biryani"],
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PD3APm2Xl728wKMGwpNc_cPj8xO1UKAIuQ&s",
        },
        {
            recipename: "Parotta",
            description: "Crispy, flaky, and oh-so-delicious —taste the magic of our sizzling hot Parotta!✨",
            ingredients: "Maida, Water, Salt, Sugar, Oil or Ghee, Milk (optional), Egg (optional) ",
            instructions: "Make Dough: Mix maida (all-purpose flour), salt, sugar, and a little oil in a bowl. Gradually add water and knead into a soft, smooth dough. Rest for 2-4 hours. Divide & Roll: Divide the dough into small balls. Roll each ball into a thin sheet using oil. Create Layers: Stretch the dough sheet thin, fold it like an accordion, then roll it into a spiral. Roll Again: Flatten the spiraled dough gently into a thick disc. Cook: Heat a tawa (griddle), cook the parotta on medium heat with oil or ghee until golden brown and crispy. Fluff & Serve: Stack the parottas and crush them gently with both hands to separate the flaky layers. Serve hot with kurma or salna! 😋",
            preparationtime: "30mins",
            servingsize:"5",
            category:"Breakfast",
            foodtype:"Veg",
            rating: 3.5,
            offers: true,
            cuisines: ["North Indian"],
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIcI2vFJ1eZJPs5VL-tTin9adAsbA7N5HDhQ&s",
        },
        {
            recipename: "Gulab Jamun",
            description: "Soft, syrup-soaked dumplings with a rich, caramelized flavor—Gulab Jamun melts in your mouth! 🍯✨",
            ingredients: "Khoya (Mawa) or Milk Powder, Maida (All-purpose flour), Baking soda, Milk or Water ,Ghee or Oil ,Sugar, Water ,Cardamom Powder ,Rose Water(optional),Saffron Strands (optional) ",
            instructions: "Make Sugar Syrup: Boil sugar, water, cardamom powder, and saffron for 5-7 minutes until slightly sticky. Add rose water and keep warm. Prepare Dough: Mix khoya (or milk powder), maida, and baking soda. Add a little milk to knead into a soft, smooth dough. Rest for 10 minutes. Shape Balls: Grease your hands, roll the dough into small, crack-free balls. Fry: Heat ghee or oil on low-medium heat. Fry the balls until golden brown, stirring gently for even cooking. Soak: Immediately drop the fried jamuns into the warm sugar syrup and let them soak for at least 1-2 hours. Serve & Enjoy: Serve warm or chilled, garnished with pistachios or almonds! ",
            preparationtime: "50mins",
            servingsize:"7",
            category:"Lunch",
            foodtype:"Veg",
            rating: 4.5,
            offers: true,
            cuisines: ["Desserts"],
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxiuWPXt42O1XwaZRJldHmKVWIcCafof2wOg&s",
        },
        {
            recipename: " Sandwich",
            description: "Juicy chicken, gooey cheese, zesty sauce, and crispy crust—every bite of chicken pizza is pure bliss! 🍕🔥",
            ingredients: "Khoya (Mawa) or Milk Powder, Maida (All-purpose flour), Baking soda, Milk or Water ,Ghee or Oil ,Sugar, Water ,Cardamom Powder ,Rose Water(optional),Saffron Strands (optional) ",
            instructions: "Make Sugar Syrup: Boil sugar, water, cardamom powder, and saffron for 5-7 minutes until slightly sticky. Add rose water and keep warm. Prepare Dough: Mix khoya (or milk powder), maida, and baking soda. Add a little milk to knead into a soft, smooth dough. Rest for 10 minutes. Shape Balls: Grease your hands, roll the dough into small, crack-free balls. Fry: Heat ghee or oil on low-medium heat. Fry the balls until golden brown, stirring gently for even cooking. Soak: Immediately drop the fried jamuns into the warm sugar syrup and let them soak for at least 1-2 hours. Serve & Enjoy: Serve warm or chilled, garnished with pistachios or almonds! ",
            preparationtime: "50mins",
            servingsize:"7",
            category:"Dinner",
            foodtype:"Veg",
            rating: 4.5,
            offers: true,
            cuisines: ["Italian"],
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PD3APm2Xl728wKMGwpNc_cPj8xO1UKAIuQ&s",
        },
        {
            recipename: "Hot Pot",
            description: "A bubbling pot of rich broth, fresh ingredients, and bold flavors—hotpot is a feast for all! 🔥🍲",
            ingredients: "Khoya (Mawa) or Milk Powder, Maida (All-purpose flour), Baking soda, Milk or Water ,Ghee or Oil ,Sugar, Water ,Cardamom Powder ,Rose Water(optional),Saffron Strands (optional) ",
            instructions: "Make Sugar Syrup: Boil sugar, water, cardamom powder, and saffron for 5-7 minutes until slightly sticky. Add rose water and keep warm. Prepare Dough: Mix khoya (or milk powder), maida, and baking soda. Add a little milk to knead into a soft, smooth dough. Rest for 10 minutes. Shape Balls: Grease your hands, roll the dough into small, crack-free balls. Fry: Heat ghee or oil on low-medium heat. Fry the balls until golden brown, stirring gently for even cooking. Soak: Immediately drop the fried jamuns into the warm sugar syrup and let them soak for at least 1-2 hours. Serve & Enjoy: Serve warm or chilled, garnished with pistachios or almonds! ",
            preparationtime: "50mins",
            servingsize:"9",
            category:"Dinner",
            foodtype:"Non-veg",
            rating: 3.5,
            offers: true,
            cuisines: ["Chinese"],
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxiuWPXt42O1XwaZRJldHmKVWIcCafof2wOg&s",
        },
        {
            recipename: "Ramen",
            description: "Slurp-worthy noodles, flavorful broth, tender meat, and savory toppings—ramen is comfort in a bowl! 🍜🔥",
            ingredients: "Khoya (Mawa) or Milk Powder, Maida (All-purpose flour), Baking soda, Milk or Water ,Ghee or Oil ,Sugar, Water ,Cardamom Powder ,Rose Water(optional),Saffron Strands (optional) ",
            instructions: "Make Sugar Syrup: Boil sugar, water, cardamom powder, and saffron for 5-7 minutes until slightly sticky. Add rose water and keep warm. Prepare Dough: Mix khoya (or milk powder), maida, and baking soda. Add a little milk to knead into a soft, smooth dough. Rest for 10 minutes. Shape Balls: Grease your hands, roll the dough into small, crack-free balls. Fry: Heat ghee or oil on low-medium heat. Fry the balls until golden brown, stirring gently for even cooking. Soak: Immediately drop the fried jamuns into the warm sugar syrup and let them soak for at least 1-2 hours. Serve & Enjoy: Serve warm or chilled, garnished with pistachios or almonds! ",
            preparationtime: "50mins",
            servingsize:"7",
            category:"Lunch",
            foodtype:"Non-Veg",
            rating: 4.5,
            offers: true,
            cuisines: ["Japanese"],
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIcI2vFJ1eZJPs5VL-tTin9adAsbA7N5HDhQ&s",
        },
        
    ];

    await RestaurantModel.insertMany(restaurantData);
    console.log("Restaurant data seeded successfully!");
}

function startServer() {
    app.get("/health", (req, res) => {
        res.status(200)
        .json("Server is up and running");
    });

    app.get("/api/restaurants", async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find({});
            res.status(200).json({ success: true, data: restaurants });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
