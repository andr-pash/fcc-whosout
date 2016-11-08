const mongoose = require('mongoose')


const barSchema = mongoose.Schema({
    barId: { type: String, unique: true }
})


module.exports = mongoose.model('Bar', barSchema)
