var Report = require('../models/report')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const { database } = require('../config/dbconfig')
const mongoose = require('mongoose')

var reportService = {
    addNew: async function (req, res) {
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const newReport = new Report(req.body);
        const filter = {
            date: {
                $gte: day,
                $lt: nextDay,
            },
        }
        let reportDB = await Report.findOneAndUpdate(
            filter,
            newReport, {
            new: true
        }
        );
        if (reportDB) {
            reportDB
        } else {
            Report.init()
            let newReport = new Report(
                req.body,
            );

            newReport.save(function (err, newReport) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save report ' + err })
                }
                else {
                    res.json({ success: true, msg: 'Save Report Successfully' })
                }
            })
        }
    },
    deleteReport: async function (req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Report with id: ${id}` });
        }
        try {
            await Report.findByIdAndRemove(id);
            res.status(200).json({ message: "Delete Report is success" });
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    updateReport: async function (req, res) {
        const { id } = req.params;
        const { staff, outflowBillTotal, entertainmentBillTotal, resBillTotal, roomBillTotal } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Report with id: ${id}` });
        }
        try {
            await Report.findByIdAndUpdate(id, { $set: { staff: staff, outflowBillTotal: outflowBillTotal, entertainmentBillTotal: entertainmentBillTotal, resBillTotal: resBillTotal, roomBillTotal: roomBillTotal } });
            res.status(200).json({ message: 'Update Ingredient sucess' });
        } catch (err) {
            return res.status(409).json({ message: err.message });
        }
    },
    getReport: async function (req, res) {
        try {
            const report = await Report.findOne({
                _id: req.params.id
            }).exec()
            if (!report) throw new Error("The Report does not exist");
            res.status(200).jsonp(report);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }

    },
    getAllReport: async function (req, res) {
        try {
            var report = await Report.find().populate(["staff"]).exec();
            res.status(200).json(report)
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },
    getAllReportByDate: async function (req, res) {
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        nextDay.setDate(day.getDate() + 1);
        //console.log(nextDay);
        try {
            const report = await Report.find({
                date: {
                    $gte: day,
                    $lt: nextDay,
                },
            }).populate(["staff"]).exec();
            return res.status(200).json(report);
        } catch (err) {
            res.status(403).send({ success: false, message: err.message });
        }
    },

    getAllReportFromDayToDay: async function (req, res) {
        const { startDay, endDay } = req.query;
        let theStartDay = new Date(startDay);
        let theEndDay = new Date(endDay);
        console.log(theStartDay);
        console.log(theEndDay);
        try {
            const report = await Report.find({
                date: {
                    $gte: theStartDay,
                    $lt: theEndDay,
                },
            }).populate(["staff"]).exec();
            return res.status(200).json(report);
        } catch (err) {
            res.status(403).send({ success: false, message: err.message });
        }
    },
}
module.exports = reportService