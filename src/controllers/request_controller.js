const mongoose = require('mongoose')
const Staff = require('../models/staff')
const Request = require('../models/request')
const Ingredient = require('../models/ingredient')
const requestService = {
    addNew: async function (req, res) {

        var newRequest = new Request(req.body);

        newRequest.save(function (err, newRequest) {
            if (err) {
                res.json({ success: false, msg: 'Failed to save Import Request === ERROR: ' + err })
            }
            else {
                res.json({ success: true, msg: 'Save Request Successfully' })
            }
        })
    },

    getRequestByDate: async function (req, res) {
        try {
            const request = await Request.find({
                date: {
                    $gte: new Date(req.query.year, req.query.month-1, req.query.day), 
                    $lt: new Date(req.query.year, req.query.month-1, req.query.day+1)
                },
                type: 1,
                status: 1,
            });
            res.status(200).json(request);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },

    getTypeofRequest: async function (req, res){
        try {
          const requestDB = await Request.find({ type: req.query.type}).populate("staffId").exec();
        //    for(let request in requestDB){
        //     request.staffId = await Staff.findById(request.staffId)
        //    }            
          return res.status(200).json(requestDB);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },

    getStatusTypeofRequest: async function (req, res){
        try {
          const requestDB = await Request.find({ type: req.query.type, status: req.query.status}).populate("staffId").exec();
        //    for(let request in requestDB){
        //     request.staffId = await Staff.findById(request.staffId)
        //    }            
          return res.status(200).json(requestDB);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },
    getAllRequest: async function(req, res){
        try{
            const requestDB = await Request.find().populate("staffId").exec();
            return res.status(200).json(requestDB);
        } catch (e){
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },
    updateRequest: async function (req, res){
        const { id } = req.params;
        const { status } = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No request Request with id: ${id}`});
        }
        try{
            await Request.findByIdAndUpdate(id, {$set: {status},});
            res.status(201).json({msg: "Update request success"});
        } catch (err){
            res.status(409).json({ msg: error.message });
        }
    }
}

module.exports = requestService