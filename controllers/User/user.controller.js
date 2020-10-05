const { Order } = require("../../models/Order/order.model");
const User = require("../../models/User/users.model");



exports.getUserById = (req, res, next ,id) => {
    User.findById(id).exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    message: "No User found in db"
                });
            }
            req.profile = user;
            next();
        })
}

exports.getUser = (req, res) => {
    req.profile.encry_password = undefined;
    req.profile.salt = undefined; 
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({
        _id: req.profile._id
    }, {
        $set: req.body
    }, {
        new: true, useFindAndModify: false
    }).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                message: err.message
            });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        return res.json({
            user
        });
    });   
}

exports.userPurchaseList = (req, res) => {
    Order.find({ 
        user: req.profile._id
    }).populate("user", "_id name")
        .exec((err, orders) => {
            if(err || !order) {
                return res.status(400).json({
                    message: err
                });
            }

            return res.json({
                orders
            });
        })
}



// exports.getAllUsers = (req, res) => {
//     const users = User.find().exec((err, users) => {
//         if(err && !users) {
//             return res.status(400).json({
//                 message: "No users found"
//             });
//         }
//         return res.status(200).json({
//             users
//         });
//     });
// }