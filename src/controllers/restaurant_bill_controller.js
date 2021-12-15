const  mongoose  = require('mongoose')
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
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        nextDay.setDate(day.getDate() + 1);
        try{
            const resBillDB = await RestaurantBill.find({status: req.query.status, 
                date: {
                    $gte: day, 
                    $lt: nextDay,
                },
            }).populate([{path: 'staffId'},{path: 'resBillDetail.food'}]);
            return res.status(200).json(resBillDB);
        } catch (error) {
            res.status(403).send({ success: false, message: error.message });
        }
    },
    updateBillStatus: async function(req, res){
        const {id} = req.params;
        const {status} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({msg: "No Bill with id: ${id}"});
        try {
            await RestaurantBill.findByIdAndUpdate(id, {
                $set: {status},
            });
            res.status(201).json({msg: "Update bill status success"});
        } catch (error) {
            res.status(409).json({msg: error.msg});
        }
    },
    getBillByPaidStatus: async function(req, res){
        const today = new Date();
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        nextDay.setDate(day.getDate() + 1);
        try{
            const resBillDB = await RestaurantBill.find({paidStatus: req.query.paidStatus, 
                date: {
                    $gte: day, 
                    $lt: nextDay,
                },
            }).populate([{path: 'staffId'},{path: 'resBillDetail.food'}]);
            return res.status(200).json(resBillDB);
        } catch (error) {
            res.status(403).send({ success: false, message: error.message });
        }
    },
    updatePaidStatus: async function(req, res){
        const {id} = req.params;
        const {paidStatus} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({msg: `No Bill with id: ${id}`});
        try {
            await RestaurantBill.findByIdAndUpdate(id, {
                $set: {paidStatus},
            });
            res.status(201).json({msg: "Update bill status success"});
        } catch (error) {
            res.status(409).json({msg: error.msg});
        }
    },
    deleteBill: async function(req, res){
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Bill with id: ${id}`});
        }
        try {
            await RestaurantBill.findByIdAndRemove(id);
            res.status(201).json({msg: "Delete bill status success"});
        } catch (error) {
            res.status(409).json({msg: error.msg});
        }
    },
}

module.exports = restaurantBillService