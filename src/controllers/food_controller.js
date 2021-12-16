var Food = require('../models/food')
const mongoose = require('mongoose')
const sharp = require("sharp")
const Image = require('../models/image')
const Constant = require("../utils/constant")

var foodService = {
    addNew: async function (req, res){
        let foodDB = await Food.findOne({foodName: req.body.foodName});
        if(foodDB){
            res.json({success: false, msg: 'Food already exits'})
        } else {
           const {foodName, foodPrice, foodType} = req.body;
           let url ="";
           try{
               if(req.file){
                   const buffer = await sharp(req.file.buffer).png().toBuffer();
                   const image = await new Image({data: buffer}).save();
                   url = `${Constant.imageDirection}/${image._id}`;
               }
               const foodDB = new Food({
                   foodName: foodName,
                   foodPrice: foodPrice,
                   foodType: foodType,
                   image: url,
               });
               const result = await foodDB.save();
               res.status(200).json(result);
           } catch (err){
               res.status(409).json({message: err.message});
           }
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
        const{foodPrice, foodName} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No food with id: ${id}`});
        }
        else{
            try {
                const foodDB = await Food.findByIdAndUpdate(id, {$set: {foodPrice: foodPrice, foodName: foodName},});
                await foodDB.save();
                res.status(200).json({msg: "Update food is success"});
            } catch (err){
                res.status(409).json({ msg: err.message });
            }
        }
        
    },
    getFoodType: async function(req, res){
        try {
            const food = await Food.find({foodType: req.query.foodType}).exec();
            res.status(200).json(food);
        } catch (err){
            res.status(400).json({message: err.message});
        }
    },
    deleteFood: async function(req, res){
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No Food with id: ${id}`});
        }
        try{
            await Food.findByIdAndRemove(id);
            res.status(200).json({message: "Delete Food is success"});
        } catch (err){
            res.status(400).json({message: err.message})
        }
    }
}

module.exports = foodService