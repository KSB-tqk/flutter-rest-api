const Request = require('../models/request')
const IngredientDetail = require('../models/request_detail')
var requestService = {
    addNew: async function (req, res) {

        var arr = req.body.ingredientDetail;
        var ingredientDetailList = [];
        arr.forEach(function (dbIngredientDetail) {
            var tempIngredientDetail = IngredientDetail(dbIngredientDetail);
            ingredientDetailList.push(tempIngredientDetail)
        });

        var newRequest = new Request({
            type: req.body.type,
            date: req.body.date,
            staffId: req.body.staffId,
            ingredientDetail: ingredientDetailList,
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

// addNew: async function (req, res) {

//     // const ingredient = new Ingredient(req.body.ingredient);
//     var arr = req.body.ingredient;
//     var ingredientList = [];
//     arr.forEach(function (dbIngredient) {
//         tempIngredient = Ingredient(dbIngredient);
//         ingredientList.push(tempIngredient)
//     });

//     var newRequestDetail = new RequestDetail({
//         quantity: req.body.quantity,
//         ingredient: ingredientList,
//     });

//     newRequestDetail.save(function (err, newRequestDetail) {
//         if (err) {
//             res.json({ success: false, msg: 'Failed to save Request Detail === ERROR: ' + err })
//         }
//         else {
//             res.json({ success: true, msg: 'Save Request Detail Successfully' })
//         }
//     })
// },