var mongoose = require("mongoose")

var EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  author: {
    type: String,
    ref: "User"
  }
})

module.exports = Event = mongoose.model('Event', EventSchema)