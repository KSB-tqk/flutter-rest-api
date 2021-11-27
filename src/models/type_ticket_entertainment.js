const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typeTicketEntertainmentSchema = new Schema({
    typeName: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true
    },
    multiplier: {
        type: Number,
        default: 1,
    }
})

module.exports = mongoose.model('TypeTicketEntertainment', typeTicketEntertainmentSchema)