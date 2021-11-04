var Food = require('../models/food')
const mongoose = require('mongoose')

var foodService = {
    addNew: async function (req, res){
        let foodDB = await Food.findOne({foodName: req.body.foodName});
        if(foodDB){
            res.json({success: false, msg: 'Food already exits'})
        } else {
            Food.init()
            let newFood = new Food({
                foodName: req.body.foodName,
                foodPrice: req.body.foodPrice,
            });

            newFood.save(function (err, newFood) {
                if(err){
                    res.json({success: false, msg: 'Failed to Save New Food' + err})
                } else {
                    res.json({success: true, msg: 'Save Food Successfully!' })
                }
            })
        }
    },
    getFood: async function (req, res){
        try {
            const food = await Food.findOne({
                _id: req.params.id
            }).exec()
            if (!food) throw new Error("The Food does not exist");
            res.status(200).json(food);
        } catch (e) {
            res.status(403).send({success: false, msg: e.toString()})
        }
    },
    getAllFood: async function (req, res){
            try {
                Food.find({} ,function(err, foodDB){
                    var foodMap ={}
                    foodDB.forEach(function (request){
                        foodMap[request._id] = request
                    })
                    res.status(200).send(foodMap)
                })
            } catch (e) {
                res.status(403).send({ success: false, msg: e.toString() })
            }
        }
}

module.exports = foodService