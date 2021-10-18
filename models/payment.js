var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ingredientSchema = require('./payment')
var paymentSchema = new Schema({
    staffName: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    ingredients: [ingredientSchema]
})