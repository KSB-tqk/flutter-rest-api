const express = require('express')
const request_method = require('../methods/request_method')
const router = express.Router()

//add new request 
//route POST /add
router.post('/add', request_method.addNew)

module.exports = router