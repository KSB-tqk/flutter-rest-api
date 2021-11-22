const express = require('express')
const {roomService, bookingService} = require('../controllers/room_controller')
const router = express.Router()

const routerBooking = express.Router({mergeParams: true})

router.post('/', roomService.addRoom);
router.get('/', roomService.getAllRoom);

router.patch('/:id', bookingService.insertBooking);

router.use('/:id/booking', routerBooking);
routerBooking.delete('/', bookingService.deleteBooking);


module.exports = router