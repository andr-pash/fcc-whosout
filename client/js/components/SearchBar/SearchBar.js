import React from 'react'
import './searchbar.sass'


export default class SearchBar extends React.Component {

  constructor() {
    super()

    this.state = {
      searchQuery: ''
    }

    this._handleChange = this._handleChange.bind(this)
    this.getBars = this.getBars.bind(this)
  }


 componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({ searchQuery: nextProps.defaultCity })
    }
  }


  _handleChange(evt) {
    this.setState({ searchQuery: evt.target.value })
  }

  getBars(evt) {
    if (evt.key === 'Enter')
      this.props.getBarsfromYelp(this.state.searchQuery)
  }

  render() {

    return(
      <div class="searchbar__container">
        <input
          type="text"
          class="searchbar__input"
          placeholder="Enter your city..."
          value={ this.state.searchQuery }
          onChange={ this._handleChange }
          onKeyPress={ this.getBars }
        />
        <button
          class="searchbar__btn"
          onClick={ () => this.props.getBarsfromYelp(this.state.searchQuery) }
        >
          GO
        </button>
      </div>
    )
  }
}
