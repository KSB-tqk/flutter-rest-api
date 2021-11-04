const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entertainmentSchema = new Schema({
    entertainName:{
        type: String, 
        required: true,
    },
    entertainPrice:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Entertainment', entertainmentSchema)