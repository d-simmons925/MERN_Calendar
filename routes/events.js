const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Event = require('../models/event')

router.get('/', auth, (req, res) => {
  Event.find({ author: req.user.id })
    .sort({ date: -1 })
    .then(events => res.json(events))
})

router.post('/', auth, (req, res) => {
  const { title, date, author } = req.body
  const newEvent = new Event({
    title,
    date,
    author,
  })
  newEvent.save().then(event => res.json(event))
})

router.delete('/:id', auth, (req, res) => {
  Event.findById(req.params.id)
    .then(event => event.remove().then(() => res.json({ success: true })))
    .catch(err => req.status(404).json({ success: false }))
})

router.put('/:id', auth, (req, res) => {
  Event.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title } })
    .then(() => res.json({ success: true }))
    .catch(err => req.status(404).json({ success: false }))
})

module.exports = router
