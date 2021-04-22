const { Event }= require('../models/event')

getEvents = (req, res) => {
    res.json({
        events: [
            {
                EventName: "FootBall Events",
                EventType: "Sports",
                EventOrganiser: "FIFA",
                EventDescription: "this is the football event"
            }
        ]
    })
}

createEvent = (req, res) => {
    
    const event = new Event(req.body)
    event.save().then(result => {
        res.status(200).json({
            event : result
        });
    });
};

module.exports = {
    getEvents,
    createEvent
}