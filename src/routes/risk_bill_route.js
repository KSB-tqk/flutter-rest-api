const express = require('express')
const risk_bill_method = require('../controllers/risk_controller')
const router = express.Router()


router.get('/', risk_bill_method.getRiskBill)

router.get('/all', risk_bill_method.getAllriskBill)
//add new request 
//route POST /add
router.post('/add', risk_bill_method.addNew)
//find import request by date
//route /:date
router.get('/bills_by_date', risk_bill_method.getAllriskBillByDate)
// update status request
router.patch('/:id', risk_bill_method.updateRiskBill);
module.exports = router