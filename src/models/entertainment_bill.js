const mongoose = require('mongoose');
const entertainmentSchema = require('./entertaiment').schema
const Schema = mongoose.Schema

const entertainmentBillSchema = new Schema({
    status:{
        type: Number,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    entertainBillDetail: [{
        food: {
            type: entertainmentSchema,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        } // total price of 1 entertainment
    }],
    totalPrice: {
        type: Number,
        required: true,
    } 
})

module.exports = mongoose.model('EntertaimentBill', entertainmentBillSchema)