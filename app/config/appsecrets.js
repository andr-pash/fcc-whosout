const appSecrets = {
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET
  },
  twitter: {
    appId: process.env.TWITTER_APP_ID,
    appSecret: process.env.TWITTER_APP_SECRET
  },
  yelp: {
    appId: process.env.YELP_APP_ID,
    appSecret: process.env.YELP_APP_SECRET
  }
}

if (process.env.NODE_ENV !== 'production') {
  appSecrets.facebook.callbackURL = 'http://127.0.0.1:3000/auth/facebook/callback'
  appSecrets.twitter.callbackURL = 'http://127.0.0.1:3000/auth/twitter/callback'
} else {
  appSecrets.facebook.callbackURL = 'https://wo-fcc.herokuapp.com/auth/facebook/callback'
  appSecrets.twitter.callbackURL = 'https://wo-fcc.herokuapp.com/auth/twitter/callback'
}

module.exports = appSecrets
