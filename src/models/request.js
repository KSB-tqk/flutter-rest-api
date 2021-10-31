var mongoose = require('mongoose')
const ingredientSchema = require('./ingredient').schema
const userSchema = require('./staff').schema
var Schema = mongoose.Schema

requestSchema = new Schema({
    type: {
        type: Number,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    staffId: {
        type: String,
        require: true,
    },
    status: {
        type: Number,
        require: true,
    },
    ingredientDetail: [{
        quantity: {
            type: Number,
            require: true,
        },
        ingredient: {
            type: ingredientSchema,
            require: true,
        }
    }],
    total: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model("Request", requestSchema)