const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


const { User } = require('../models/user')
require('dotenv').config()

// register User controller

const registerUser = async (req, res) => {

    const userExists = await User.findOne({ email: req.body.email })
    if(userExists){
        return res.status(403).json({
            error: "User already exists with that email Please LogIn"
        })
    }

    const body = req.body;

    if(!(body.email && body.hashed_password && body.name))
        return res.status(400).send({ error: "Data is not formatted properly "})

    const user = new User(body)

    const salt = await brcypt.genSalt(12)
    user.hashed_password = await brcypt.hash(user.hashed_password, salt)
    user.save()
        .then(() => res.status(201).json({
            message: "User successfully registered! Please LogIn "
        }))
        .catch((err)=> res.json({
            error: err
        }))
}

// login user controller

const loginUser = async(req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await brcypt.compare(body.hashed_password, user.hashed_password);
      if (validPassword) {
        //generate a token with userid and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        //persist the token as 'tkn' in cookie with expiry date 
        res.cookie("tkn", token , { expire: new Date() +9999 })
        //return response with user and token to frontend client 
        const{ _id, name , email } = user

        res.status(200).json({ token, user: { _id, email, name } });
      } else {
          // password is incorrect
        res.status(400).json({ error: "Password is incorrect! Please enter the correct password" });
      }
    } else {
        //user didnt have any account 
      res.status(401).json({ error: "User does not exist! Please register" });
    }
}

//for logging out the user 

const logoutUser = (req, res ) => {
    res.clearCookie('tkn');
    res.json({
        message: "Logout Successful "
    })
}

//for protecting certain routes

const requireLogin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
})



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
    registerUser,
    loginUser,
    logoutUser,
    requireLogin,
    hasAuthotization

}