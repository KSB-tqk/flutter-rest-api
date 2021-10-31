var User = require('../models/staff')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

const { database } = require('../config/dbconfig')

var functions = {
    addNew: function (req, res) {
        if ((!req.body.name) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password,
                fullName: req.body.fullName,
                dateOfBirth: req.body.dateOfBirth,
                role: req.body.role,
                phoneNum: req.body.phoneNum,
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Save Successfully' })
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) {
                throw (err)
            }
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication Failed, wrong password' })
                    }
                })
            }
        })
    },
    getInfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res
                .status(200)
                .jsonp(decodedtoken);
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    },
    getInfoById: async function (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).exec()
            if (!user) throw new Error("User does not exist")
            res.status(200).jsonp(user)
        } catch (e) {
            res.status(403).send({ success: false, msg: e })
        }
    }
}

module.exports = functions