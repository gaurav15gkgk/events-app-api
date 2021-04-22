const express = require('express')

const {getEvents, createEvent} = require('../controllers/event')
const { createEventValidator } = require('../validators')

const router = express.Router()

router.get('/', getEvents)
router.post('/event',createEventValidator, createEvent)

module.exports = router