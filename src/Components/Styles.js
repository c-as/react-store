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

export const Input = styled.input`
  font: inherit;
  border-radius: 0.3rem;
  padding: 0.4rem;
  padding-left: 0.9rem;
  box-sizing: border-box;
  border: 1px solid lightgrey;
  :focus {
    outline: none;
    border: 1px solid deepskyblue;
  }
  :invalid {
    box-shadow: none;
    border: 1px solid indianred;
  }
`
