const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/User/users.model");


exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
      message: "User has been signout"
  });
};
exports.signUp = (req,  res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: {
                message: errors.array()[0].msg,
                param: errors.array()[0].param
            }
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
         if(err) {
             return res.status(400).json({
                 message: err
             });
         }
 
         return res.json({
             id: user._id,
             name: user.name,
             email: user.email,
             lasname: user.lastname
         });
    });
}

exports.signIn = (req, res) => {
    const { body : { email, password } } = req;
    const errors = validationResult(req);

    // adding validation rules
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(404).json({
                message: "User doesn't exists"
            });
        }

        // try to autheticate a user
        if(!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password don't matched"
            });
        }
        
        // generate a token for sign in
        const token = jwt.sign({
            _id: user._id,
        }, process.env.JWT_STRING);

        // saving token in cookies
        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id, role, name, email } = user;
        return res.status(200).json({
            token,
            user: { _id, role, name, email }
        });
        
    });
}