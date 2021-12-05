const express = require('express')
const restaurant_bill_controller = require('../controllers/restaurant_bill_controller')
const router = express.Router()

//add new restaurant bill 
//route POST /add
router.post('/add', restaurant_bill_controller.addNew)

//find restaurant bill by status
// route GET /filter
router.get('/status', restaurant_bill_controller.getBillByStatus)

router.get('/paid', restaurant_bill_controller.getBillByPaidStatus)

//UPDATE bill status
router.patch('/status/:id', restaurant_bill_controller.updateBillStatus)

router.patch('/paid/:id', restaurant_bill_controller.updatePaidStatus)


module.exports = router