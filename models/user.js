//Dependencies requiered
const mongoose = require('mongoose')
const { Schema } = mongoose

//User Schema declared
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)


module.exports = {
    User
}