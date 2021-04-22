//Dependencies required
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

//Event Schema is declared
const EventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true
    },
    EventType:{
        type:String,
        required: true
    },

    EventOrganiser:{
        type: String,
        required: true
    },

    DateOfEvent:{
        type: Date,
        required: true
    },

    EventDescription:{
        type:String,
        required: true
    },

    postedBy: {
        type: ObjectId,
        ref: 'User'
    },

    created: {
        type: Date,
        default: Date.now()
    },

    updated: Date


})

const Event = mongoose.model("Event", EventSchema)

module.exports = {
    Event 
}