const express = require('express')
const { roomService, bookingService } = require('../controllers/room_controller');
const { route } = require('./ingredient_route');
const router = express.Router()

const routerBooking = express.Router({ mergeParams: true })

router.post('/', roomService.addRoom);
router.patch('/:id', roomService.updateRoom);
router.get('/', roomService.getAllRoom);
router.get('/find_room', roomService.findRoom);
router.get('/paid_bills', bookingService.get_paid_room_bill_today);

router.post('/:id', bookingService.insertBooking);

router.use('/booking', routerBooking);
routerBooking.post('/:id', bookingService.insertBooking);
routerBooking.get('/all', bookingService.getAllReservation);
routerBooking.get('/:id', bookingService.getReservationByRoomId);
routerBooking.delete('/:id', bookingService.deleteBooking);
routerBooking.get('/reservation_detail/:id', bookingService.getReservationDetail);
routerBooking.patch('/update_paid_status/:id', bookingService.updatePaidStatus);

module.exports = router 