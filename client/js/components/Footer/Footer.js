import React from 'react'
import './footer.sass'

export default class Footer extends React.Component {
  render() {
    return(
      <footer className="footer">
        <span className="footer__text">&copy; Andreas Pashalides 2016</span>
        <span className="footer__logo"></span>
      </footer>
    )
  }
}
