const mongoose = require('mongoose');
const reservationRoomSchema = require('./reservation_room').schema
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    nameRoom:{
        type: String,
        required: true,
    },
    roomPrice: {
        type: Number,
        required: true,
    },
    booked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReservationRoom',
        required: true,
    }],
})

module.exports = mongoose.model('Room', roomSchema); 