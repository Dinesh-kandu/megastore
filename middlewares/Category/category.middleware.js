const Category = require("../../models/Category/category.model")



exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id)     
        .exec((err, category) => {
            if(err || !category)    {
                return res.status(400).json({
                    message: `error Catrgory ${err}`
                })
            }
           req.category = category;
           next();
        });
}