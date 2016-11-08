import React from 'react'
import LoginBtn from '../LoginBtn/LoginBtn'
import SignInBox from '../SignInBox/SignInBox'
import './nav.sass'

export default class Nav extends React.Component {

  constructor() {
    super()

    this.state = {
      signinBoxOpen: false
    }

    this._toggleSignInBox = this._toggleSignInBox.bind(this)
  }

  _toggleSignInBox() {
    if (this.state.signinBoxOpen)
      this.setState({ signinBoxOpen: false })

    if (!this.state.signinBoxOpen)
      this.setState({ signinBoxOpen: true })
  }

  render() {

    const props = {
      _toggleSignInBox: this._toggleSignInBox,
      ...this.props
    }

    return (

      <nav class="nav__container">

        <div
          className="nav__profile-pic"
          style={{ backgroundImage: `url(${this.props.profilePicUrl})` }}>
        </div>

        <div className="nav__signin-btn">
          <LoginBtn { ...props } />
          { this.state.signinBoxOpen ? <SignInBox /> : ''}
        </div>
      </nav>

    )
  }
}
