var mongoose = require('mongoose')
// var userSchema = require('./user').schema
var foodSchema = require('./food').schema
var Schema = mongoose.Schema

var resBillSchema = new Schema({
    status:{
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an interger value",
        }
    },
    date:{
        type: String,
        required: true,
    },
    staffID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }, 
    resBillDetail: [{
        food: {
            type: foodSchema,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        } // total price of 1 food 
    }],
    totalPrice: {
        type: Number,
        required: true,
    } // total price of bill
})

module.exports = mongoose.model('RestaurantBill', resBillSchema)