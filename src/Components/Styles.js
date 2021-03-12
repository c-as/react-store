import styled from "styled-components"

export const ColorBox = styled.p`
  padding: 0.4em;
  background-color: lightgreen;
  border-radius: 0.3rem;
`

export const Button = styled(ColorBox)`
  color: white;
  background-color: orange;
  width: max-content;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  a {
    color: inherit;
    font: inherit;
    text-decoration: inherit;
  }
`
