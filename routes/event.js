const express = require('express')
const {userById} = require('../controllers/user')

const {
    getEvents, 
    createEvent,
    isEventOrganiser,
    updateEvent,
    eventById,
    deleteEvent,
    eventsByUser
} = require('../controllers/event')
const { createEventValidator } = require('../validators')
const { requireLogin } = require('../controllers/auth')
const router = express.Router()

router.get('/', getEvents)
router.post('/event/new/:userId',requireLogin, createEventValidator, createEvent)
router.put('/event/:eventId', requireLogin, isEventOrganiser, updateEvent)
router.delete('/event/:eventId', requireLogin, isEventOrganiser, deleteEvent)
router.get('/events/by/:userId', requireLogin, eventsByUser)

router.param('userId', userById);
router.param('eventId', eventById)

module.exports = router