
const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidV1 = require("uuid/v1");


const Schema = mongoose.Schema;

// Making a first User Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength:32,
        trim:32,
        default: null
    },
    email: {
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    userInfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type:String,
    },
    salt: String,
    role: {
        type: Number,
        default:0
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });

userSchema.methods = {
    securePassword: function(plainPassword) {
        if(!plainPassword) return "";
        try {
            return crypto.createHash("sha256", this.salt)
                        .update(plainPassword)
                        .digest("hex");
        } catch(e) {
            console.log(e.message)
        }
    },
    autheticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },
}


userSchema.virtual("password")
            .set(function(password) {
                try {
                    this._password = password;
                    this.salt = uuidV1();
                    this.encry_password = this.securePassword(password)
                } catch(e) {
                    console.log(e.message);
                    return e.message;
                }
            }) 
            .get(function() {
                return this._password;
            })
// exporting a schema
module.exports = mongoose.model("User", userSchema);