const express = require('express')

const {getEvents} = require('../controllers/event')

const router = express.Router()

router.get('/', getEvents)

module.exports = router