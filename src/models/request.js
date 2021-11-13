var mongoose = require('mongoose')
const ingredientSchema = require('./ingredient').schema
var Schema = mongoose.Schema

requestSchema = new Schema({
    type: {
        type: Number,
        require: true,
    },
    nameRequest:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        require: true,
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
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