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
    image: {
        type: String,
        required: false,
        default: "",
    },
    foodType: {
        type: Number,
        defaul: 1,
        
    }
})

module.exports = mongoose.model('Food', foodSchema)