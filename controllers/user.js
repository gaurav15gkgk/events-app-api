const brcypt = require('bcrypt')
const { body } = require('express-validator/check');

const { User } = require('../models/user')

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
        res.status(200).json({ message: "User succesfully Login" });
      } else {
        res.status(400).json({ error: "Password is incorrect! Please enter the correct password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist! Please register" });
    }
}


module.exports = {
    registerUser,
    loginUser
}