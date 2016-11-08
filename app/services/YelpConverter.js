const Bar = require('../models/Bar')
const Attendee = require('../models/Attendee')


class YelpConvertor {
  createResponseObj(data, user) {

    let responseObj = data.businesses.map( el => {
      return {
        name: el.name,
        barId: el.id,
        imgUrl: el.image_url,
        counter: 0,
        isGoing: false
      }
    })

    responseObj = responseObj.map( el => {

      let counter = 0
      let isGoing = false
      let currentBar;

      return Bar.findOne({ barId: el.barId })
        .then( bar => {
          currentBar = bar

          // only lookup attendance if there's already an entry for that bar
          if (currentBar)
            return Attendee.find({ bar: currentBar._id })

          return null

        })
        .then( attendees => {

          counter = attendees ? attendees.length : 0

          // only query wether user attends bar if user is logged in
          if (attendees && user)
            return Attendee.findOne({ bar: currentBar._id, user: user._id })

          return null

        })
        .then( attendee => {

          isGoing = attendee ? true : false
          el.counter = counter
          el.isGoing = isGoing

          return el

        })
        .catch( err => console.log('error querying data for responseObj:', err))

      })

    return Promise.all(responseObj)
  }


  createBarInfoObject(data) {
    let responseObj = {
      name: data.name,
      imgUrl: data.image_url,
      location: {
        street: data.location.address1,
        zipCode: data.location.zip_code,
        city: data.location.city,
      },
      phone: data.phone,
      attendees: []
    }


    return Bar.findOne({ barId: data.id })
      .then( bar => {
        if (!bar)
          return null

        return Attendee.find({ bar: bar._id })
          .populate('user')

      })
      .then( attendees => {
        if (!attendees || attendees.length === 0)
          return responseObj

        responseObj.attendees = attendees.map( el => {

          let name = el.user.twitter.username || el.user.facebook.username
          let imgUrl = el.user.twitter.profilePic || el.user.facebook.profilePic

          return {
            name,
            imgUrl
          }
        })

        return responseObj

      })
      .catch( err => console.log(err))
  }

}

module.exports = YelpConvertor
