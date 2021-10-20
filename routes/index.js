const express = require('express')
const action = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//add new user
//route POST /adduser
router.post('/add', action.addNew)
//authenticate a user
//route POST /authenticate
router.post('/authenticate', action.authenticate)
//get info a user
//route GET /getinfo 
router.get('/getinfo', action.getinfo)

module.exports = router