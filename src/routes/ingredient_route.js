const express = require('express')
const ingredient_method = require('../controllers/ingredient_controller')
const router = express.Router()
const passport = require('passport')

//add new ingredient
//route POST /addIngredient
router.post('/add', passport.authenticate('jwt', { session: false }), ingredient_method.addNew)
//get user
//route GET /getIngredient
router.get('/', ingredient_method.getAllIngre)

router.get('/:id', ingredient_method.getIngredient)

router.patch('/update/:id', ingredient_method.updateIngre)

router.delete('/:id', ingredient_method.deleteIngre)



module.exports = router
