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
                _id: new mongoose.Types.ObjectId().toHexString(),
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

    }
}
module.exports = ingredientService