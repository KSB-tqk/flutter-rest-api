const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typeTicketEntertainmentSchema = new Schema({
    typeName: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('TypeTicketEntertainment', typeTicketEntertainmentSchema)