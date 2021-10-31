const RestaurantBill = require('../models/restaurant_bill')
var restaurantBillService = {
    addNew: async function(req, res) {
        var newResBill = new RestaurantBill(req.body)

        newResBill.save(function (err, newResBill ) {
            if(err){
                res.json({success: false, msg: 'Failed to save Restaurant Bill === ERROR: ' + err})
            } else {
                res.json({ success: true, msg: 'Save Bill Successfully' })
            }
        })
    },
    getBillByStatus: async function (req, res) {
        try {
            RestaurantBill.find({status: req.query.status}, function(err, resbillDB){
                var resBillMap = {};

                resbillDB.forEach(function(resbill){
                    resBillMap[resbill._id] = resbill
                });
                res.status(200).send(resBillMap);
            })
        } catch (e) {
            res.status(403).send({success: false, msg: e.toString()})
        }
    }
}

module.exports = restaurantBillService