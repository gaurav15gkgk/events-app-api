const User = require('../models/user')

// to add the profile in the request when user is find by userId
const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next()
    })
}

//to verify the logged in user is the user in which changes are happening
const hasAuthotization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perfrom this action "
        })
    }
}

module.exports = {
    userById,
    hasAuthotization
}