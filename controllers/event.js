const { Event }= require('../models/event')

getEvents = async(req, res) => {
   const events = await Event.find()
        .populate("postedBy", "_id name email")
   .then( events => {
       res.status(200).json({ events: events })
   })
   .catch(
       err => console.log(err)
   )
}

createEvent = async(req, res) => {
    
    const event = await new Event(req.body)

    req.profile.hashed_password = undefined
    event.postedBy = req.profile
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