const express = require('express')
const { session } = require('passport')
const passport = require('passport')
const reqDetail_method = require('../methods/request_detail_method')
const router = express.Router()

//add new Request Detail
//route POST /add
router.post('/add', reqDetail_method.addNew)
//add new Request Detail
//route POST /add
router.get('/:id', passport.authenticate('jwt', { session: false }), reqDetail_method.getRequestDetail)

module.exports = router