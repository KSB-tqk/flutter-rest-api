const express = require('express')
const passport = require('passport')
const action = require('../controllers/staff_controller')
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
router.get('/getinfo', action.getInfo)
//get info a user
//route GET /getinfo 
router.get('/:id', passport.authenticate('jwt', { session: false }), action.getInfoById)

module.exports = router