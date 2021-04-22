const express = require('express')
const { registerUser, loginUser , logoutUser} = require('../controllers/user')
const { userRegisterValidator } = require('../validators')

const router = express.Router()

router.post('/register',userRegisterValidator, registerUser)
router.post('/login',loginUser )
router.get('/logout', logoutUser )

module.exports = router