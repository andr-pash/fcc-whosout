const mongoose = require('mongoose')
const User = require('./User')
const Bar = require('./Bar')

const attendeeSchema = mongoose.Schema({
  valid: { type: Date, default: Date.now(), expires: '18h' },
  bar: { type:mongoose.Schema.Types.ObjectId, ref: 'Bar' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})


module.exports = mongoose.model('Attendee', attendeeSchema)
