const express = require('express')
const {roomService, bookingService} = require('../controllers/room_controller');
const { route } = require('./ingredient_route');
const router = express.Router()

const routerBooking = express.Router({mergeParams: true})

router.post('/', roomService.addRoom);
router.get('/', roomService.getAllRoom);

router.get('/room_detail/:id', roomService.getRoomDetail);

router.patch('/:id', bookingService.insertBooking);

router.use('/:id/booking', routerBooking);
routerBooking.delete('/', bookingService.deleteBooking);
routerBooking.patch('/update_paid_status', bookingService.updatePaidStatus);


module.exports = router