var mongoose = require('mongoose')
var Schema = mongoose.Schema

var riskBillSchema = new Schema({
    troubleName: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        default: "Empty"
    },
    date: {
        type: Date,
        required: true,
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    price: {
        type: Number,
        required: true,
    } // total price of bill
})

module.exports = mongoose.model('RiskBill', riskBillSchema)