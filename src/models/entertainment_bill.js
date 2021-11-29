const mongoose = require('mongoose');
const entertainmentSchema = require('./entertaiment').schema
const Schema = mongoose.Schema

const entertainmentBillSchema = new Schema({
    staff:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    dateCreate:{
        type: Date,
        required: true,
    },
    entertainBillDetail: [{
        entertainment: {
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
        },
        type: {
            type: String, 
            required: true,
        } // total price of 1 entertainment
    }],
    totalPrice: {
        type: Number,
        required: true,
    } 
})

module.exports = mongoose.model('EntertaimentBill', entertainmentBillSchema)