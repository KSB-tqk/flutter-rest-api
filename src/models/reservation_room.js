const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationRoomSchema = new Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    dateCreate: {
        type: String,
        required: true,
    },
    customerName:{
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('ReservationRoom', reservationRoomSchema);