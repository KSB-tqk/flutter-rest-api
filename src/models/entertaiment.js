const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entertainmentSchema = new Schema({
    entertainName:{
        type: String, 
        required: true,
    },
    typeTicket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TypeTicketEntertainment',
        required: true,
    }],
});


module.exports = mongoose.model('Entertainment', entertainmentSchema)