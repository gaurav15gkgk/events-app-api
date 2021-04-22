const express = require('express')

const {getEvents, createEvent} = require('../controllers/event')
const { createEventValidator } = require('../validators')
const { requireLogin } = require('../controllers/user')
const router = express.Router()

router.get('/', requireLogin, getEvents)
router.post('/event',createEventValidator, createEvent)

module.exports = router