const axios = require('axios')
const encodeurl = require('form-urlencoded')

class YelpConnector {

  constructor(id, secret) {

    this.clientId = id
    this.secret = secret
    this.accessToken = this._retrieveAccessToken()

    this._retrieveAccessToken = this._retrieveAccessToken.bind(this)
    this.searchBars = this.searchBars.bind(this)
  }

  _retrieveAccessToken() {
    axios({
        method: 'post',
        url: 'https://api.yelp.com/oauth2/token',
        data: encodeurl({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.secret
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then( response => {
        this.accessToken = response.data.access_token
      })
      .catch( err => console.log(err ))
  }

  searchBars(loc) {
    return axios({
      method: 'get',
      url: 'https://api.yelp.com/v3/businesses/search',
      params: {
        categories: 'bars',
        radius: 5000,
        location: loc
      },
      headers: { 'Authorization': `bearer ${this.accessToken}`}
    })
  }

  lookupBar(barId) {
    return axios({
      method: 'get',
      url: `https://api.yelp.com/v3/businesses/${encodeURIComponent(barId)}`,
      headers: { 'Authorization': `bearer ${this.accessToken}`}
    })
  }


}


module.exports = YelpConnector
