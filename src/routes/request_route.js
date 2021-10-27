const express = require('express')
const request_method = require('../methods/request_method')
const router = express.Router()

//add new request 
//route POST /add
router.post('/add', request_method.addNew)
//find request by date
//route /:date
router.get('/import-filter-by-date', request_method.getRequestByDate)

module.exports = router