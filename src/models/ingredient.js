var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ingredientSchema = new Schema({
    _id: {
        type: String,
        require: true,
    },
    ingredientName: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    unit: {
        type: String,
        require: true,
    }
})
module.exports = mongoose.model('Ingredient', ingredientSchema)

