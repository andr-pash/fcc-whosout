const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbURL = process.env.MONGODB_URI
require('dotenv').config()


// set up db connection
mongoose.connect(dbURL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => app.listen(process.env.PORT || 3000))


// init app and pass middleware
const app = express()
app.use(bodyParser())


// Authentication config
require('./app/config/passport')(passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({ mongooseConnection: db })
}))
app.use(passport.initialize())
app.use(passport.session())


// Routing config
app.use( express.static('./app/public'))
require(__dirname + '/app/routes')(app, passport)
