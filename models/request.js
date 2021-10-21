var mongoose = require('mongoose')
const requestDetailSchema = require('./request_detail').schema
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
    ingredientDetail: [{ type: requestDetailSchema, require: true }],
    total: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model("Request", requestSchema)