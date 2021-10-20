const express = require('express')
const reqDetail_method = require('../methods/requestDetail_method')
const router = express.Router()

//add new Request Detail
//route POST /add
router.post('/add', reqDetail_method.addNew)
//add new Request Detail
//route POST /add
router.get('/:id', reqDetail_method.getRequestDetail)

module.exports = router