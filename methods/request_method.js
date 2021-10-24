const Request = require('../models/request')
const Ingredient = require('../models/ingredient')
var requestService = {
    addNew: async function (req, res) {

        var newRequest = new Request({
            type: req.body.type,
            date: req.body.date,
            staffId: req.body.staffId,
            ingredientDetail: req.body.ingredientDetail,
            total: req.body.total,
        });

        newRequest.save(function (err, newRequest) {
            if (err) {
                res.json({ success: false, msg: 'Failed to save Import Request === ERROR: ' + err })
            }
            else {
                res.json({ success: true, msg: 'SaveImport Request Successfully' })
            }
        })
    }
}

module.exports = requestService