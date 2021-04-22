//Dependencies required
const express = require('express')

//Some created Modules required
const { registerUser, loginUser , logoutUser } = require('../controllers/auth')
const { userRegisterValidator } = require('../validators')

//Initialized express router
const router = express.Router()

//to register a user 
router.post('/register',userRegisterValidator, registerUser)

//to login a user
router.post('/login',loginUser )

//to logout a user
router.get('/logout', logoutUser )

module.exports = router