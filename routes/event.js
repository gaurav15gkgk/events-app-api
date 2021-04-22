const express = require('express')
const {userById} = require('../controllers/user')

const {getEvents, createEvent} = require('../controllers/event')
const { createEventValidator } = require('../validators')
const { requireLogin } = require('../controllers/auth')
const router = express.Router()

router.get('/', getEvents)
router.post('/event/new/:userId',requireLogin, createEventValidator, createEvent)
router.param('userId', userById);

module.exports = router