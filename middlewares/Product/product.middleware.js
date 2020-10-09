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