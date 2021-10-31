const express = require('express')
const restaurant_bill_controller = require('../controllers/restaurant_bill_controller')
const router = express.Router()

//add new restaurant bill 
//route POST /add
router.post('/add', restaurant_bill_controller.addNew)

//find restaurant bill by status
// route GET /filter
router.get('/filter', restaurant_bill_controller.getBillByStatus)

module.exports = router