const express = require('express')
const food_controller = require('../controllers/food_controller')
const router = express.Router()
const passport = require('passport')
const food = require('../models/food')
const { route } = require('./restaurant_bill_route')
const upload = require('../middleware/upload')

//add new food 
// route POST/addFood
router.post('/add', upload.single("image") , food_controller.addNew, (error, req, res, next) => {
    res.status(400).send({ error: error.toString() });
  });

router.delete('/:id', food_controller.deleteFood);

//route GET /getFood
router.get('/', food_controller.getAllFood);

// get by typeFood
router.get('/type', food_controller.getFoodType);

// update food
router.patch('/:id', upload.single("image"), food_controller.updateFood);



module.exports = router