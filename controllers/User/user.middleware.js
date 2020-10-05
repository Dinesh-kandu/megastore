const User = require("../../models/User/users.model");




exports.pushOrdersInPurchaseList = (res, req, next) => {
    let purchases = [];

    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product.id,
            name:   product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    
    // store this in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases }},
        {new: true}, (err, purchases)  => {
            if(err || !purchases) {
                return res.status(400).json({
                    message: "Unable to save purchase list"
                });
            }
        });
        next();
}