const express = require('express')
const report_method = require('../controllers/report_controller')
const router = express.Router()
const passport = require('passport')

//add new ingredient
//route POST /addIngredient
router.post('/add', report_method.addNew)
//get user
//route GET /getIngredient
router.get('/', report_method.getAllReport)

router.get('/get_report_by_date', report_method.getAllReportByDate)

router.get('/fromDtoD', report_method.getAllReportFromDayToDay)

router.get('/:id', report_method.getReport)

router.patch('/update/:id', report_method.updateReport)

router.delete('/:id', report_method.deleteReport)

module.exports = router
