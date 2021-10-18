const express = require('express')
const ingredient_method = require('../methods/ingredient_method')
const router = express.Router()

//add new user
//route POST /adduser
router.post('/addingredient', ingredient_method.addNew)

module.exports = router
