import React from 'react'
import './attendee.sass'

export default class Attendee extends React.Component {
  render() {

    let { name, imgUrl } = this.props

    return(
      <div className="attendee__container">
        <img src={imgUrl} alt="" className="attendee__img"/>
        <div className="attendee__name">{name}</div>
      </div>
    )
  }
}
