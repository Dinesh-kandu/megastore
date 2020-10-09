const Product = require("../../models/Product/product.model");



// Middleware

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
            .exec((err, product) => {
                if(err || !product) {
                    return res.json({
                        message: err.message
                    });
                }
                req.product = product;
                next();
            })
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.updateStocks = (req, res, next) => {
    let myOpreations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id},
                update: { $inc : { stock: -prod.count, sold: +prod.count }}
            }
        }
    });

    Product.bulkWrite(myOpreations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                message: err.message,
                from: "Couldn't update Stocks"
            })
        }
        next();
    })
}