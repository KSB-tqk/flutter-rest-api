const Request = require('../models/request')
const Ingredient = require('../models/ingredient')
var requestService = {
    addNew: async function (req, res) {

        var newRequest = new Request({
            type: req.body.type,
            date: req.body.date,
            status: req.body.status,
            staffId: req.body.staffId,
            ingredientDetail: req.body.ingredientDetail,
            total: req.body.total,
        });

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
            Request.find({ date: req.body.date, status: req.body.status, type: req.body.type }, function (err, requestDb) {
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