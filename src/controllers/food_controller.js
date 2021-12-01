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
                foodType: req.body.foodType
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
    getAllFood: async function (req, res){
            try {
               const food = await Food.find().exec();
               res.status(200).json(food);
            } catch (e) {
                res.status(403).send({success: false, msg: e.toString()})
            }
    },
    updateFood: async function (req, res){
        const {id} = req.params;
        const{foodPrice} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No food with id: ${id}`});
        }
        try {
            await Food.findByIdAndUpdate(id, {$set: {foodPrice},});
            res.status(200).json({msg: "Update food is success"});
        } catch (err){
            res.status(409).json({ msg: err.message });
        }
    },
    getFoodType: async function(req, res){
        try {
            const food = await Food.find({foodType: req.query.foodType}).exec();
            res.status(200).json(food);
        } catch (err){
            res.status(400).json({message: err.message});
        }
    }
}

module.exports = foodService