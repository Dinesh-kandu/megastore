
const Category = require("../../models/Category/category.model")


exports.createCategory = (req, res) => {

    const category = new Category(req.body);
    category.save((err, category) => {
            if(err || !category) {
                return res.status(400)
                        .json({
                            message: err.message
                        });  
            }

            return res.json({ category });
    });
}

exports.getCategory = (req, res) => {
    //
    return res.json({ 
        category: req.category
    });
};
exports.getAllCategory = (req, res) => {
    Category.find().exec((err, items) => {
        if(err || !items) {
            res.status(400).json({
                message: err.message
            });
        }

        return res.json({
            categories: items
        });
    });
};

exports.updateCategory = (req, res) => {
    //
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err || !updatedCategory) {
            return res.status(400).json({
                message: err.message
            });
        }
        return res.json({ updatedCategory })
    })

}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error: err.message  
            });
        }

        return res.json({
            message: `Category has been deleted ${category}`,
        });
    })
}