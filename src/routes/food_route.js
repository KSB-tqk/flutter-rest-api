const express = require('express')
const food_controller = require('../controllers/food_controller')
const router = express.Router()
const passport = require('passport')

//add new food 
// route POST/addFood
router.post('/add', passport.authenticate('jwt', {session: false}), food_controller.addNew)

//route GET /getFood
router.get('/', food_controller.getAllFood)

// update food
router.patch('/:id', food_controller.updateFood)



module.exports = router