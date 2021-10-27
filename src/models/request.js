var mongoose = require('mongoose')
const ingredientSchema = require('./ingredient').schema
const userSchema = require('./user').schema
var Schema = mongoose.Schema

requestSchema = new Schema({
    type: {
        type: String,
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
        type: String,
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