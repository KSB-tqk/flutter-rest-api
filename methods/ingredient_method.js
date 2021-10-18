var Ingredient = require('../models/ingredient')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const { database } = require('../config/dbconfig')

var ingredientService = {
    addNew: async function (req, res) {
        let ingredientDB = await Ingredient.findOne({ ingredientName: req.body.ingredientName });
        if (ingredientDB) {
            res.json({ success: false, msg: 'Ingredient already exist' })
        } else {
            var newIngredient = new Ingredient({
                ingredientName: req.body.ingredientName,
                price: req.body.price,
                amount: req.body.amount,
                currency: req.body.currency,
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
    }
}
module.exports = ingredientService