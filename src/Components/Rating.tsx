import { useMemo } from "react"
import FullStar from "../Assets/star_full.svg"
import HalfStar from "../Assets/star_half.svg"
import EmptyStar from "../Assets/star_empty.svg"
import styled from "styled-components"

const StyledImg = styled.img`
  height: 1.5rem;
`

export default function Rating({ score }: { score: number }) {
  const stars = useMemo(() => {
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
    return stars
  }, [score])

  return <div>{stars}</div>
}
