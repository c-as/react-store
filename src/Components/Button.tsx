import { HTMLAttributes } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ColorBox } from "./Styles"

export const Styled = styled(ColorBox)`
  color: white;
  width: max-content;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  user-select: none;
  a {
    color: inherit;
    font: inherit;
    text-decoration: inherit;
  }
  :hover {
    text-decoration: underline;
  }
`

export default function Button(
  props: HTMLAttributes<HTMLParagraphElement> & { to?: string }
) {
  const navigate = useNavigate()

  if (props.to) {
    return (
      <Styled
        {...props}
        onClick={() => {
          props.to && navigate(props.to)
        }}
      />
    )
  } else {
    return <Styled {...props} />
  }
}
