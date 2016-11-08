import React from 'react'
import SocialSignIn from '../SocialSignIn/SocialSignIn'
import './signin-box.sass'

export default class SignInBox extends React.Component {
  render() {
    return (
      <div className="signin-box__container">
        <SocialSignIn socialNetwork="facebook" />
        <SocialSignIn socialNetwork="twitter" />
        <p>Sign In to tell your friends where you're headed tonight!</p>
      </div>
    )
  }
}
