const mongoose = require('mongoose')


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
    }
})

const Event = mongoose.model("Event", EventSchema)

module.exports = {
    Event 
}