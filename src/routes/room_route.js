const express = require('express')
const room_controller = require('../controllers/room_controller')
const router = express.Router()

router.post('/', room_controller.addRoom);
router.get('/', room_controller.getAllRoom);

router.patch('/:id', room_controller.insertBooked);



module.exports = router