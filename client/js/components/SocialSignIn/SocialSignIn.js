import React from 'react'
import './social-signin.sass'

export default class SocialSignIn extends React.Component {

  render() {
    const socialNetwork = this.props.socialNetwork
    const buttonClass = 'social-signin-btn social-signin-btn--' + socialNetwork

    return (
      <a class={buttonClass} href={`/auth/${socialNetwork}`}>
        Sign In with { socialNetwork }
      </a>
    )
  }
}
