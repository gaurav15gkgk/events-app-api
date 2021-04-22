const express = require('express')

const {getEvents, createEvent} = require('../controllers/event')

const router = express.Router()

router.get('/', getEvents)
router.post('/event', createEvent)

module.exports = router