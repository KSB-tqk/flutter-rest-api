var mongoose = require('mongoose');
const ingredientSchema = require('../models/ingredient').schema;
var Schema = mongoose.Schema;

var requestDetailSchema = new Schema({
    quantity: {
        type: Number,
        require: true
    },
    ingredient: [ingredientSchema]
})

module.exports = mongoose.model('RequestDetail', requestDetailSchema)