const express = require('express')
const { registerUser, loginUser , logoutUser } = require('../controllers/auth')
const { userRegisterValidator } = require('../validators')
const { userById } = require("../controllers/user")

const router = express.Router()

router.post('/register',userRegisterValidator, registerUser)
router.post('/login',loginUser )
router.get('/logout', logoutUser )

//any route containing :userId , it will execute userById 
router.param("userId", userById)

module.exports = router