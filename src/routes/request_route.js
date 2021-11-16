const express = require('express')
const request_method = require('../controllers/request_controller')
const router = express.Router()


router.get('/', request_method.getAllRequest)
//add new request 
//route POST /add
router.post('/add', request_method.addNew)
//find import request by date
//route /:date
router.get('/import', request_method.getRequestByDate)
// get type of request
router.get('/type', request_method.getTypeofRequest)
// get status of request
router.get('/status', request_method.getStatusTypeofRequest)
// update status request
router.patch('/:id', request_method.updateRequest);
module.exports = router