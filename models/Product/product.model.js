
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 25,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim:true,
    },
    catrgory: {
        type: ObjectId,
        ref: "Catrgory",
        required: true
    },
    stock: {
        type: Number,
    },
    sold : {
        type: Number,
        default:0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productScheme)