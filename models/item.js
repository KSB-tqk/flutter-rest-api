var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var itemSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    staffInfo: {
        type: String,
        require: true,
    },
    
})