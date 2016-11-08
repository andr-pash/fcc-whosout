const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  defaultCity: { type: String, default: '' },
  facebook: {
    facebookId: { type: String, unique: true },
    username: String,
    profilePic: String
  },
  twitter: {
    twitterId: { type: String, unique: true },
    username: String,
    profilePic: String
  },
})

userSchema.methods.addTwitter = (twitterId, username, profilePic) => {

  const newTwitter = {
    twitterId,
    username,
    profilePic
  }

  return newTwitter
}

userSchema.methods.addFacebook = (facebookId, username) => {

  const newFacebook = {
    facebookId,
    username,
    profilePic: `https://graph.facebook.com/${facebookId}/picture`
  }

  return newFacebook
}

module.exports = mongoose.model('User', userSchema)
