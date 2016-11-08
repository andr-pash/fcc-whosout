const appSecrets = require('./config/appsecrets')
const YelpConnector = require('./services/YelpConnector')
const yelp = new YelpConnector(appSecrets.yelp.appId, appSecrets.yelp.appSecret)
const YelpConvertor = require('./services/YelpConverter')
const convertor = new YelpConvertor()
const User = require('./models/User')
const Bar = require('./models/Bar')
const Attendee = require('./models/Attendee')


module.exports = (app, passport) => {


  app.get('/login', (req, res) => {
    res.send('failed Authentication')
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.send('loggedOut')
  })


  app.post('/search', (req, res) => {

    let { loc } = req.body
    console.log('session:', req.session)
    req.session.city = loc

    if (req.isAuthenticated()) {
      User.findById(req.user.id)
        .then( user => {
          user.defaultCity = loc
          user.save()
        })
        .catch( err => console.log(err) )
    }

    yelp.searchBars(loc)
      .then( response => {
        return convertor.createResponseObj(response.data, req.user)
      })
      .then( resObj => {
        res.send(resObj)
      })
      .catch( err => console.log(err))
  })


  app.get('/api/barinfo/:barId', (req, res) => {
    const barId = req.params.barId

    yelp.lookupBar(barId)
      .then( bar => convertor.createBarInfoObject(bar.data))
      .then( resObj => res.send(resObj))
      .catch(err => console.log('error looking up barInfo:', err))

  })


  app.get('/api/attend/:barId', (req, res) => {
    const barId = req.params.barId
    const user = req.user

    Bar.findOne({ barId })
      .then( bar => {

        if (!bar) {
          bar = new Bar()
          bar.barId = barId
        }

        bar.save()
          .catch( err => console.log('err saving bar:', err))

        const newAttendee = new Attendee({
          bar: bar._id,
          user: user._id
        })

        newAttendee.save()
          .catch( err => console.log('err saving attendee:', err))

        res.send()
      })
      .catch( err => console.log('error adding attendance:', err))
  })

  app.get('/api/unattend/:barId', (req, res) => {
    const barId = req.params.barId
    const user = req.user

    Bar.findOne({ barId })
      .then( bar => {

        Attendee.findOne({ user: user._id, bar: bar._id })
          .then( attendee =>  attendee.remove())
          .catch( err => console.log('error removing attendee:', err))

        res.send()
      })
      .catch( err => console.log('error removing attendance:', err))
  })



  app.get('/auth', (req, res) => {
    if (req.isAuthenticated()){
      User.findById(req.user.id)
        .then( user => {
          res.send({
            loggedIn: 'loggedIn',
            profilePicUrl: user.twitter.profilePic || user.facebook.profilePic,
            defaultCity: user.defaultCity || req.session.city
           })
        })
    } else {
      res.send({})
    }
  })

  app.get('/auth/twitter/', passport.authenticate('twitter'))

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    })

  app.get('/auth/facebook/',
  passport.authenticate('facebook'))

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    })
}
