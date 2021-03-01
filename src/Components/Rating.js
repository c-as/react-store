import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import FullStar from "../Assets/star_full.svg"
import HalfStar from "../Assets/star_half.svg"
import EmptyStar from "../Assets/star_empty.svg"
import styled from "styled-components"

const StyledImg = styled.img`
  height: 1.5rem;
`

export default function Rating({ score }) {
  const [stars, setStars] = useState()

  useEffect(
    function () {
      let stars = []
      let current = score
      for (let i = 0; i < 5; i++) {
        if (current >= 1) {
          stars.push(<StyledImg src={FullStar} alt="" key={i} />)
          current--
        } else if (current === 0.5) {
          stars.push(<StyledImg src={HalfStar} alt="" key={i} />)
          current--
        } else {
          stars.push(<StyledImg src={EmptyStar} alt="" key={i} />)
        }
      }
      setStars(stars)
    },
    [score]
  )

  return <div>{stars}</div>
}

Rating.propTypes = {
  score: PropTypes.number,
}
