const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationRoomSchema = new Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    dateCreate: {
        type: Date,
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
        type: Date,
        required: true,
    },
    checkOut:{
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('ReservationRoom', reservationRoomSchema);