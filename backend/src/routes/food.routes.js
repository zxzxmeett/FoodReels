const express = require('express');
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

/* POST /api/food/ [protected]*/ //uploading food item by food partner
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("mama"),
    foodController.createFood)

/* GET /api/food/ [protected] */ //get food items for user feed
router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems)

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)

module.exports = router