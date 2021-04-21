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

module.exports = {
    getEvents
}