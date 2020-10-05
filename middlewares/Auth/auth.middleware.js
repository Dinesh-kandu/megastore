const expressJwt = require("express-jwt");



exports.isSignedin = expressJwt({
    secret: process.env.JWT_STRING,
    userProperty: "auth"
});

exports.isAuthenicated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            message: "Access Denied Could not be authenicated"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.send(403).json({
            message: "Access Denied"
        });
    }
    next();
}