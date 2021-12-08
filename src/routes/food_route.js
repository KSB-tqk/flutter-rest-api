const express = require('express')
const food_controller = require('../controllers/food_controller')
const router = express.Router()
const passport = require('passport')
const food = require('../models/food')
const { route } = require('./restaurant_bill_route')

//add new food 
// route POST/addFood
router.post('/add', passport.authenticate('jwt', {session: false}), food_controller.addNew);

router.delete('/:id', food_controller.deleteFood);

//route GET /getFood
router.get('/', food_controller.getAllFood);

// get by typeFood
router.get('/type', food_controller.getFoodType);

// update food
router.patch('/:id', food_controller.updateFood);



module.exports = router