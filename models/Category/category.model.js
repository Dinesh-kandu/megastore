const mongoose = require("mongoose")

const Scheme = mongoose.Schema;


const catrgorySchema = new Scheme({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength:32,
        unique:true,
    }
}, { timestamps: true } // setting up timestamps
)


module.exports = mongoose.model("Category", catrgorySchema);
