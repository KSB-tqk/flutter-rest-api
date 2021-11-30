const express = require('express')
const {roomService, bookingService} = require('../controllers/room_controller');
const { route } = require('./ingredient_route');
const router = express.Router()

const routerBooking = express.Router({mergeParams: true})

router.post('/', roomService.addRoom);
router.get('/', roomService.getAllRoom);
router.get('/find_room_bills', bookingService.get_room_bills_by_date);

router.patch('/:id', bookingService.insertBooking);

router.use('/booking', routerBooking);
routerBooking.get('/:id', bookingService.getAllReservationByRoomId);
routerBooking.delete('/:id', bookingService.deleteBooking);
routerBooking.get('/reservation_detail/:id', bookingService.getReservationDetail);
routerBooking.patch('/update_paid_status/:id', bookingService.updatePaidStatus);




module.exports = router 