//for profile data
const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id; // take id from params

    const foodPartner = await foodPartnerModel.findById(foodPartnerId) //find food partner by id
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId }) //find food items by food partner id

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

module.exports = {
    getFoodPartnerById
};