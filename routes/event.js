//Dependicies Requiered
const express = require('express')

//Different created modules requiered
const {userById} = require('../controllers/user')
const {
    getEvents, 
    createEvent,
    isEventOrganiser,
    updateEvent,
    eventById,
    deleteEvent,
    eventsByUser,
    singleEvent
} = require('../controllers/event')
const { createEventValidator } = require('../validators')
const { requireLogin } = require('../controllers/auth')

// Initialized express Router
const router = express.Router()

//to get all the events
router.get('/events', getEvents)

//to create new event by a loggedin user
router.post('/event/new/:userId',requireLogin, createEventValidator, createEvent)

//to update an event
router.put('/event/:eventId', requireLogin, isEventOrganiser, updateEvent)

//to delete an event
router.delete('/event/:eventId', requireLogin, isEventOrganiser, deleteEvent)

//to show all the events by a user
router.get('/events/by/:userId', requireLogin, eventsByUser)

//to call userById function when userId is in URL
router.param('userId', userById)

router.get('/events/:eventId', singleEvent)

//to call eventById function when eventId is in URL
router.param('eventId', eventById)



module.exports = router