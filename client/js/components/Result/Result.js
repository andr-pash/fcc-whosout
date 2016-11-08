import React from 'react'
import './result.sass'


export default class Result extends React.Component {

  constructor() {
    super()

    this.state = {
      shake: false
    }

    this.addClass = this.addClass.bind(this)
  }

  addClass() {
    this.setState({ shake: true })
    setTimeout( () => this.setState({ shake: false }), 500)
  }


  render() {

    let { isGoing,
      barId,
      counter,
      name,
      imgUrl,
      toggleAttending,
      index,
      loggedIn } = this.props

    const containerClass = 'result__container ' + (this.state.shake ? 'shake' : '')
    const btnClass = 'result__btn' + (isGoing ? ' result__btn--on' : '')
    const btnText = isGoing ? "You're going!" : "I'm going"


    return(
      <div class={ containerClass } >

        <img
          src={imgUrl}
          alt=""
          class="result__img"
          onClick={ () => this.props.showInfo(barId) }
        />

        <div class="result__box">
          <h3 class="result__name">{name}</h3>

          <div class="result__counterContainer">
            <span class="result__counter">
              {counter} {counter === 1 ? 'is' : 'are'} going
            </span>
          </div>

          <div class="result__btnContainer">
            <button
              type="button"
              onClick={
                loggedIn ?
                () => toggleAttending(barId, isGoing, index) :
                this.addClass
              }
              class={ btnClass }
            >
              { btnText }
            </button>
          </div>

        </div>
      </div>
    )
  }
}
