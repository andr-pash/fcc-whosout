import React from 'react'
import Result from '../Result/Result'
import './results.sass'


export default class Results extends React.Component {

  constructor(){
    super()
  }

  render() {

    const props = this.props

    const results = this.props.bars.map( (el, i) => {
      return (
        <Result
          { ...el }
          { ...props }
          index={i}
          key={i}
        />
      )
    })

    return(
      <div className="results__container">
        { results }
      </div>
    )
  }
}
