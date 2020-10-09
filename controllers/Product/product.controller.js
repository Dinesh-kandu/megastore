
const formidable = require("formidable");
const Product = require("../../models/Product/product.model");
const fs = require("fs");
const _ = require("lodash")


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
            if(err || !fields) {
                res.status(400).json({
                    message: err.message
                });
            }

            // TODO restrections validating
            const { name, description, price, category, stock,  } = fields;

            if(!name || !description, !price || !category || !stock) {
                return res.status(400).json({
                    message: "Please provide all the details"
                });
            }

            let product = new Product(fields);

            // handle file here
            if(files.photo) {
                if(files.photo.size > 3000000) {
                    return res.status(400).json({
                        message: "File size too big"
                    });
                }
    
                product.photo.data = fs.readFileSync(files.photo.path);
                product.photo.contentType = files.photo.type;
            }

            // save to the DB
            product.save((err, product) => {
                if(err || !product) {
                    return res.status(400).json({
                        message: "Failed to store Tshirt" + err.messs
                    });
                }

                return res.json(product);
            });
    });

}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    res.json(req.product);
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, product) => {
        if(err) {
            return res.status(400).json({
                message: `Failed to delete Product -> ${err.message}`
            });
        }

        return res.json({
            message: "Product has been deleted",
            product
        });
    });
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    // parsing request to form
    form.parse(req, (err, fields, files) => {
        // error handling
        if(err) {
            res.status(400).json({
                message: err.message,
                from: "Update product"
            });
        }

        // updating all the possible fields
        let product = _.extend(req.product, fields);

        // basic validation if files exists
        if(files.photo.size > 300000)  { // should be less than 3 MB
            return res.status(400).json({
                message: "Image should be less than 3 MB"
            });
        }

        // saving image as buffer 
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        // finally update the product
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    message: err.message,
                    from: "Failed to update product"
                });
            }

            return res.json(product);
        })
    });
}

exports.getProducts = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
        .select("-photo") // hide photo that is why "-"
        .limit(limit)
        .populate("Category")
        .sort([[sortBy, "desc"]])
        .exec((err, products) => {
            if(err) {
                return res.status(400).json({
                    message: err.message,
                    from: "Couldn't get products"
                });
            }

            return res.json(products);
        })
}

exports.getProductsCategories = (req, res) => {

    // distinct is basically a where clause of SQL
    Product.distinct("category", {}, (err, categories) => {
        if(err) {
            res.status(400).json({
                message: err.message,
                from: "From get Product Categories"
            });
        }

        return res.json(categories);
    });

}