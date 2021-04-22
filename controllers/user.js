const {User} = require('../models/user')
const _=require("lodash")
const { identity } = require('lodash')

//when userid is added on the url this method will add profile in request body 

const userById = async (req, res, next, id ) => {
    await  User.findById(id).exec((err, user) => {
        if( err || !user)
        {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user; // adds profile object in req with user info
        next();
    })
 }

const getUser = (req, res) => {
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}

const updateUser = (req, res, next ) => {
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save(err => {
        if(err){
            return res.status(400).json({
                error: "You are not authorized to perform this acion"
            })
        }
    })
    user.hashed_password = undefined
    res.json({ user })
}

const deleteUser = (req, res, next ) => {
    let user = req.profile
    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "User deleted successfully "})
    })
}

module.exports = {
    userById,
    getUser,
    updateUser,
    deleteUser
}