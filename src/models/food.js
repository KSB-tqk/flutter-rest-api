var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    foodName: {
        type: String,
        require: true,
    },
    foodPrice: {
        type: Number,
        require: true,
    },
})

module.exports = mongoose.model('Food', foodSchema)