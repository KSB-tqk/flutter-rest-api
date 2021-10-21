var mongoose = require('mongoose');
const ingredientSchema = require('./ingredient').schema;
var Schema = mongoose.Schema;

var requestDetailSchema = new Schema({
    quantity: {
        type: Number,
        require: true
    },
    ingredient: {
        type: ingredientSchema,
        require: true
    }
})

module.exports = mongoose.model('RequestDetail', requestDetailSchema)