import React from 'react'
import './login-btn.sass'

export default class LoginBtn extends React.Component {
  render() {

    return(
      <button
        type="button"
        class="login-btn"
        onClick={ this.props.loggedIn ? this.props.logout : this.props._toggleSignInBox }
      >
        { this.props.loggedIn ? 'Log Out' : 'Log In' }
      </button>
    )
  }
}
