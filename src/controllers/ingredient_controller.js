var Ingredient = require('../models/ingredient')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const { database } = require('../config/dbconfig')
const mongoose = require('mongoose')

var ingredientService = {
    addNew: async function (req, res) {

        let ingredientDB = await Ingredient.findOne({ ingredientName: req.body.ingredientName });
        if (ingredientDB) {
            res.json({ success: false, msg: 'Ingredient already exist' })
        } else {
            Ingredient.init()
            let newIngredient = new Ingredient({
                ingredientName: req.body.ingredientName,
                price: req.body.price,
                unit: req.body.unit,
            });

            newIngredient.save(function (err, newIngredient) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save ingredient ' + err })
                }
                else {
                    res.json({ success: true, msg: 'Save Ingredient Successfully' })
                }
            })
        }
    },
    deleteIngre: async function (req, res){
        const{id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No Ingredient with id: ${id}`});
        }
        try{
            await Ingredient.findByIdAndRemove(id);
            res.status(200).json({message: "Delete Ingredient is success"});
        } catch (err){
            res.status(400).json({message: err.message})
        }
    },
    updateIngre: async function(req, res){
        const{id} = req.params;
        const{ingredientName, price, unit} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No Ingredient with id: ${id}`});
        }
        try{
            await Ingredient.findByIdAndUpdate(id, {$set: {ingredientName: ingredientName, price: price, unit: unit}});
            res.status(200).json({message: 'Update Ingredient sucess'});
        } catch (err){
            return res.status(409).json({message: err.message});
        }
    },
    getIngredient: async function (req, res) {
        try {
            const ingredient = await Ingredient.findOne({
                _id: req.params.id
            }).exec()
            if (!ingredient) throw new Error("The Ingredient does not exist");
            res.status(200).jsonp(ingredient);
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString() })
        }

    },
    getAllIngre: async function (req, res){
        try {
            var ingredients = await Ingredient.find().exec();
            res.status(200).json(ingredients)     
        } catch (e) {
            res.status(403).send({ success: false, msg: e.toString()})
        }
    }
}
module.exports = ingredientService