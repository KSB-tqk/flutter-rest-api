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
            Request.find({ date: req.query.date, status: req.query.status, type: req.query.type }, function (err, requestDb) {
                var requestMap = {};

                requestDb.forEach(function (request) {
                    requestMap[request._id] = request;
                });
                res.status(200).send(requestMap);
            });
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    },

    getTypeofRequest: async function (req, res){
        try {
            Request.find({ type: req.query.type }, function (err, requestDb) {
                var requestMap = {};

                requestDb.forEach(function (request) {
                    requestMap[request._id] = request;
                });
                res.status(200).send(requestMap);
            });
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }
    }
}

module.exports = requestService