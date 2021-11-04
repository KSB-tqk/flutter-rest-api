const Entertainment = require('../models/entertaiment')

var entertainmentService = {
    addNew: async function (req, res){
        let entertainDB = await Entertainment.findOne({entertainmentName: req.body.entertainmentName})
        if(entertainDB){
            res.json({success: false, msg: 'Entertainment already exits'})
        }
        else {
            Entertainment.init()
            var newEntertainment = new Entertainment({
                entertainmentName: req.body.entertainmentName,
                entertainmentPrice: req.body.entertainmentPrice,
            })

            newEntertainment.save(function(err, newEntertainment){
                if(err){
                    res.json({success: false, msg: 'Failed to Save New Entertainment' + err})
                } else {
                    res.json({success: true, msg: 'Save Entertainment Successfully!' })
                }
            })
        }
    },

}

module.exports = entertainmentService