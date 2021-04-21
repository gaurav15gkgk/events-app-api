const mongoose = require('mongoose')
const { Schema } = mongoose

const EventSchema = new Schema({
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
    EventDescription:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("Event", EventSchema)