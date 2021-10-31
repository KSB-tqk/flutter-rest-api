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
}

module.exports = foodService