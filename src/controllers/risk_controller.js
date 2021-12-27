var RiskBill = require('../models/risk_bill')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const { database } = require('../config/dbconfig')
const mongoose = require('mongoose')

var riskBillService = {
    addNew: async function (req, res) {
        RiskBill.init()
        let newriskBill = new RiskBill(
            req.body,
        );
        newriskBill.save(function (err, newriskBill) {
            if (err) {
                res.json({ success: false, msg: 'Failed to save Risk Bill' + err })
            }
            else {
                res.json({ success: true, msg: 'Save Risk Bill Successfully' })
            }
        })
    },
    deleteRiskBill: async function (req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No RiskBill with id: ${id}` });
        }
        try {
            await RiskBill.findByIdAndRemove(id);
            res.status(200).json({ message: "Delete RiskBill is success" });
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    updateRiskBill: async function (req, res) {
        const { id } = req.params;
        const { staff, outflowBillTotal, entertainmentBillTotal, resBillTotal, roomBillTotal } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No RiskBill with id: ${id}` });
        }
        try {
            await riskBill.findByIdAndUpdate(id, { $set: { staff: staff, outflowBillTotal: outflowBillTotal, entertainmentBillTotal: entertainmentBillTotal, resBillTotal: resBillTotal, roomBillTotal: roomBillTotal } });
            res.status(200).json({ message: 'Update RiskBill sucess' });
        } catch (err) {
            return res.status(409).json({ message: err.message });
        }
    },
    getRiskBill: async function (req, res) {
        try {
            const riskBill = await RiskBill.findOne({
                _id: req.params.id
            }).exec()
            if (!riskBill) throw new Error("The RiskBill does not exist");
            res.status(200).jsonp(riskBill);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }

    },
    getAllriskBill: async function (req, res) {
        try {
            var riskBill = await RiskBill.find().populate(["staff"]).exec();
            res.status(200).json(riskBill)
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },
    getAllriskBillByDate: async function (req, res) {
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        nextDay.setDate(day.getDate() + 1);
        //console.log(nextDay);
        try {
            const riskBill = await RiskBill.find({
                date: {
                    $gte: day,
                    $lt: nextDay,
                },
            }).populate(["staff"]).exec();
            return res.status(200).json(riskBill);
        } catch (err) {
            res.status(403).send({ success: false, message: err.message });
        }
    },
}
module.exports = riskBillService