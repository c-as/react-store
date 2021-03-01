import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import FullStar from "../Assets/star_full.svg"
import HalfStar from "../Assets/star_half.svg"
import EmptyStar from "../Assets/star_empty.svg"
import "./Rating.css"

export default function Rating({ score }) {
  const [stars, setStars] = useState()

  useEffect(
    function () {
      let stars = []
      let current = score
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
      setStars(stars)
    },
    [score]
  )

  return <div className="rating">{stars}</div>
}

Rating.propTypes = {
  score: PropTypes.number,
}
