import axios from 'axios'
import urlencoded from 'form-urlencoded'

import React from 'react'
import Head from '../Head/Head'
import SearchBar from '../SearchBar/SearchBar'
import Results from '../Results/Results'
import Footer from '../Footer/Footer'
import BarInfo from '../BarInfo/BarInfo'
import './layout.sass'

export default class Layout extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      profilePicUrl: '',
      defaultCity: '',
      bars: [],
      barInfo: null,
      showInfo: false
    }

    this.getBarsfromYelp = this.getBarsfromYelp.bind(this)
    this.toggleAttending = this.toggleAttending.bind(this)
    this.showInfo = this.showInfo.bind(this)
    this.hideInfo = this.hideInfo.bind(this)
    this.logout = this.logout.bind(this)
  }


  componentDidMount() {
    this.checkLoggedIn()
  }


  getBarsfromYelp(searchQuery) {
    axios({
      method: 'post',
      url: '/search',
      data: {
        loc: searchQuery
      }
    })
    .then( res => this.setState({ bars: res.data, defaultCity: searchQuery }))
    .catch( err => console.log(err))
  }


  showInfo(barId) {
    this.getBarInformation(barId)
    this.setState({ showInfo: true })
  }


  hideInfo() {
    this.setState({ showInfo: false, barInfo: null })
  }


  getBarInformation(barId) {
    axios.get(`/api/barinfo/${barId}`)
      .then( response => {
        console.log(response.data)
        this.setState({ barInfo: response.data })
      })
      .catch( err => console.log(err))
  }


  checkLoggedIn() {
    axios.get('/auth')
      .then( response => {
        if( response.data.loggedIn === 'loggedIn' ) {

          this.setState({
            loggedIn: true,
            profilePicUrl: response.data.profilePicUrl,
            defaultCity: response.data.defaultCity
          })

          if (this.state.defaultCity !== '')
            this.getBarsfromYelp(this.state.defaultCity)

        } else {
          this.setState({ loggedIn: false })
        }
      })
      .catch( err => console.log(err))
  }


  toggleAttending(barId, isGoing, index) {
    if (!isGoing) {
      axios.get(`/api/attend/${barId}`)
      let bars = this.state.bars
      bars[index].isGoing = true
      bars[index].counter++
      this.setState({ bars })
    }

    if (isGoing) {
      axios.get(`/api/unattend/${barId}`)
      let bars = this.state.bars
      bars[index].isGoing = false
      bars[index].counter--
      this.setState({ bars })
    }
  }


  logout() {
    axios.get('/logout')
      .then( _ => this.setState({ loggedIn: false, profilePicUrl: '' }))
      .then( _ => window.location = '/')
      .catch( _ => console.log(err))
  }


  render() {

    const props = {
      bars: this.state.bars,
      loggedIn: this.state.loggedIn,
      profilePicUrl: this.state.profilePicUrl,
      defaultCity: this.state.defaultCity,
      getBarsfromYelp: this.getBarsfromYelp,
      toggleAttending: this.toggleAttending,
      showInfo: this.showInfo,
      hideInfo: this.hideInfo,
      barInfo: this.state.barInfo,
      logout: this.logout
    }

    return (
      <div class="app_container">
        <Head { ...props } />
        {this.state.showInfo ?
          <BarInfo { ...props }/> :
          ''
        }
        <SearchBar { ...props } />
        <Results { ...props } />
        <Footer />
      </div>
    )
  }
}
