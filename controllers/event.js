const { Event }= require('../models/event')

getEvents = async(req, res) => {
   const events = await Event.find()
   .then( events => {
       res.status(200).json({ events: events })
   })
   .catch(
       err => console.log(err)
   )
}

createEvent = async(req, res) => {
    
    const event = await new Event(req.body)
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