const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName:{
        type: String,
        required: true,
    },
    roomPrice: {
        type: Number,
        required: true,
    },
    // booked: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ReservationRoom',
    //     required: true,
    // }],
})
roomSchema.set("toObject", { virtuals: true });
roomSchema.set("toJSON", { virtuals: true });
roomSchema.virtual("bookings", {
    ref: "ReservationRoom",
    localField: "_id",
    foreignField: "room",
});
module.exports = mongoose.model('Room', roomSchema); 