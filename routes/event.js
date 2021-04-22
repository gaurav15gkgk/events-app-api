const express = require('express')

const {getEvents, createEvent} = require('../controllers/event')
const { createEventValidator } = require('../validators')
const { requireLogin } = require('../controllers/auth')
const router = express.Router()

router.get('/', getEvents)
router.post('/event',requireLogin, createEventValidator, createEvent)

module.exports = router