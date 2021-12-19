var mongoose = require('mongoose')
var Schema = mongoose.Schema

reportSchema = new Schema({
    reportName: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    roomBillTotal: {
        type: Number,
        require: true,
    },
    resBillTotal: {
        type: Number,
        require: true,
    },
    entertainmentBillTotal: {
        type: Number,
        require: true,
    },
    outflowBillTotal: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model("Report", reportSchema)