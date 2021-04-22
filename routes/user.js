const express = require('express')
const { registerUser, loginUser } = require('../controllers/user')
const { userRegisterValidator } = require('../validators')

const router = express.Router()

router.post('/register',userRegisterValidator, registerUser)
router.post('/login',loginUser )

module.exports = router