//Dependencies required
const express = require('express')

//Required some created modules
const {
    userById,
    getUser,
    updateUser,
    deleteUser

} = require("../controllers/user")
const {  requireLogin } = require("../controllers/auth")

//initialized express router
const router = express.Router()

//to get the single user by userId
router.get("/user/:userId", requireLogin, getUser )

//to update the user details
router.put("/user/:userId", requireLogin, updateUser)

//to delete a particular user
router.delete("/user/:userId", requireLogin, deleteUser)

//to call userById fuction when userId is in URL
router.param("userId", userById)

module.exports = router