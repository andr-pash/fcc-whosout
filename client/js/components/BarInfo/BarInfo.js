import React from 'react'
import Attendee from './Attendee/Attendee'
import './barinfo.sass'

export default class BarInfo extends React.Component {

  render() {

    let { barInfo } = this.props
    let name, street, city, phone, zipCode = '...'
    let imgStyle = {'': ''}
    let attendees = []

    if (barInfo) {

    attendees = barInfo.attendees.map( (el, i) => {
      return (
        <Attendee
          imgUrl={ el.imgUrl }
          name={ el.name }
          key={ i }
        />
      )
    })

    name = barInfo.name
    phone = barInfo.phone
    street = barInfo.location.street
    city = barInfo.location.city
    zipCode = barInfo.location.zipCode
    imgStyle = {
      background: 'url(' + barInfo.imgUrl + ')',
      backgroundSize: "cover"
    }

    }


    return(
      <div className="barinfo__overlay" onClick={this.props.hideInfo}>
        <div className="barinfo__card">
          <div className="barinfo__head">
            <div className="barinfo__image" style={imgStyle}></div>
            <div className="barinfo__name">
              <h3>{ name }</h3>
              <p>
                { street } <br/>
                { zipCode }, { city } <br/>
                { phone }
              </p>
            </div>
          </div>
          <div className="barinfo__body">
            <h5>People going there:</h5>
            { attendees }
          </div>
        </div>
      </div>
    )
  }
}
