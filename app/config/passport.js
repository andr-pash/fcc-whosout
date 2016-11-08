
const FacebookStrategy = require('passport-facebook')
const TwitterStrategy = require('passport-twitter')
const User = require('../models/User')
const appSecrets = require('./appsecrets')

module.exports = (passport) => {

  passport.serializeUser( (user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new TwitterStrategy({
      consumerKey: appSecrets.twitter.appId,
      consumerSecret: appSecrets.twitter.appSecret,
      callbackURL: appSecrets.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({ 'twitter.twitterId': profile.id }, (err, user) => {
        if (err)
          return done(err)

        if (!user) {
          console.log('profile:', profile)
          console.log('no user found', user)
          const newUser = new User()
          newUser.twitter = newUser.addTwitter(
            profile.id,
            profile.displayName,
            profile.photos[0].value)
          newUser.save( () => {
            console.log('wrote to database:', newUser)
            done(null, newUser)
          })
        }

        if (user) {
          console.log('user found:', user)
          return done(null, user)
        }
      })
    }
  ))


  passport.use('facebook', new FacebookStrategy({
      clientID: appSecrets.facebook.appId,
      clientSecret: appSecrets.facebook.appSecret,
      callbackURL: appSecrets.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.facebookId': profile.id }, (err, user) => {
        if (err)
          return done(err)

        if (!user) {
          console.log('profile:', profile)
          console.log('no user found', user)
          const newUser = new User()
          newUser.facebook = newUser.addFacebook(
            profile.id,
            profile.displayName)
          newUser.save( () => {
            console.log('wrote to database:', newUser)
            done(null, newUser)
          })

          return
        }

        if (user) {
          console.log('user found:', user)
          return done(null, user)
      }
      })
    }
  ))

}
