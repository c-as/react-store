import React, { Component } from "react"
import PropTypes from "prop-types"
import FullStar from "../star_full.svg"
import HalfStar from "../star_half.svg"
import EmptyStar from "../star_empty.svg"

export default class Rating extends Component {
  render() {
    let stars = []
    let current = this.props.score
    for (let i = 0; i < 5; i++) {
      if (current >= 1) {
        stars.push(<img src={FullStar} alt="" key={i} />)
        current--
      } else if (current === 0.5) {
        stars.push(<img src={HalfStar} alt="" key={i} />)
        current--
      } else {
        stars.push(<img src={EmptyStar} alt="" key={i} />)
      }
    }
    return <div className="rating">{stars}</div>
  }
}

Rating.defaultProps = {
  score: PropTypes.number,
}
