var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ingredientSchema = new Schema({
    ingredientName: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    currency: {
        type: String,
        require: true,
    }
})

// var Ingredient = mongoose.model('Ingredient', ingredientSchema)

// ingredientSchema.pre('save', function (next) {
//     var self = this;
//     Ingredient.find({ ingredientName: self.ingredientName }, function (err, docs) {
//         if (!docs.length) {
//             console.log('ingredientName: ' + self.ingredientName);
//             next();
//         } else {
//             console.log('user exists: ', self.name);
//             next(new Error("User exists!"));
//         }
//     });
// });

module.exports = mongoose.model('Ingredient', ingredientSchema)

