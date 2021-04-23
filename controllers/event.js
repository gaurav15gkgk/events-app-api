//Dependencies Required
const  _= require('lodash')

//Some created modules required
const { Event }= require('../models/event')

// to add event when eventId is in URL
const eventById = (req, res, next, id) => {
    console.log(id)
    Event.findById(id)
        .populate('postedBy', '_id name')
        .select('_id EventName EventType EventOrganiser DateOfEvent EventDescription created ')
        .exec((err, event) => {
            if(err || !event ){
                return res.status(400).json({
                    error: err
                })
            }
            req.event = event
           
            next()
        })
}

//to get all events 
const getEvents = async(req, res) => {
   const events = await Event.find()
        .populate("postedBy", "_id name email")
   .then( events => {
       res.status(200).json({ events: events })
   })
   .catch(
       err => console.log(err)
   )
}

// to create Event 
const createEvent = async(req, res) => {
    console.log(req.profile)
    const event = await new Event(req.body)

    req.profile.hashed_password = undefined
    event.postedBy = req.profile
    event.save().then(result => {
        res.status(200).json({
            event : result
        });
    });
};

// to show all the events by an user
const eventsByUser = (req, res) => {
    Event.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id EventName EventType EventOrganiser EventDescription DateOfEvent')
        .sort('_created')
        .exec((err, events) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
               
            }
            res.json(events)
        })
}

// to verify the user which created that event is the logged in user
const isEventOrganiser = (req, res, next ) => {
    let sameUser = req.event && req.auth && req.event.postedBy._id == req.auth._id
   
    if(!sameUser){
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }

    next()
}

// to update event 
const updateEvent = (req, res, next ) => {
    let event = req.event
    event = _.extend(event , req.body)
    event.updated = Date.now()
    event.save(err => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(event)
    })
}

// to delete an event 
const deleteEvent = (req, res) => {
    let event = req.event
    event.remove((err, event) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Event deleted successfully"
        })
    })
}



module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    eventById,
    updateEvent,
    isEventOrganiser,
    eventsByUser
}