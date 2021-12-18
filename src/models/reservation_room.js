const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationRoomSchema = new Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Room',
    },
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
    paidStatus:{
        type: Number,
        default: 2,
    },
    totalPrice:{
        type: Number,
        required: true,
    }
})

reservationRoomSchema.pre("save", async function (next) {
    console.log(this);
    console.log(this.isNew)
    next();
  });

module.exports = mongoose.model('ReservationRoom', reservationRoomSchema);