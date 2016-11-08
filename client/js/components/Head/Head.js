import React from 'react'
import Nav from '../Nav/Nav'
import SearchBar from '../SearchBar/SearchBar'
import './header.sass'

export default class Head extends React.Component {
  render() {

    const props = this.props

    return(
      <div className="">
        <Nav { ...props }/>
        <header class="header__container">
          <h1 class="header__title">Who's out?</h1>
          <p class="header__annotation">powered by Yelp</p>
        </header>
      </div>
    )
  }
}
