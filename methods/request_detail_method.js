var RequestDetail = require('../models/request_detail')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const Ingredient = require("../models/ingredient");
const { database } = require('../config/dbconfig')

var requestDetailService = {
    addNew: async function (req, res) {

        const ingredient = new Ingredient(req.body.ingredient);

        var newRequestDetail = new RequestDetail({
            quantity: req.body.quantity,
            ingredient: ingredient,
        });

        newRequestDetail.save(function (err, newRequestDetail) {
            if (err) {
                res.json({ success: false, msg: 'Failed to save Request Detail === ERROR: ' + err })
            }
            else {
                res.json({ success: true, msg: 'Save Request Detail Successfully' })
            }
        })
    },
    getRequestDetail: async function (req, res) {
        try {
            const reqDetail = await RequestDetail.findOne({ _id: req.params.id }).exec()
            if (!reqDetail) throw new Error("The Request Detail does not exist");
            res.status(200).jsonp(reqDetail);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }

    }
}

module.exports = requestDetailService