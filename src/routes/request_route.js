const express = require('express')
const request_method = require('../controllers/request_controller')
const router = express.Router()

//add new request 
//route POST /add
router.post('/add', request_method.addNew)
//find import request by date
//route /:date
router.get('/import', request_method.getRequestByDate)

module.exports = router