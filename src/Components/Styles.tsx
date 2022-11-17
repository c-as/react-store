import styled from "styled-components"

export const Primary = "#0A2E36"
export const Secondary = "#bdc9cc"
export const Accent = "#14CC60"
export const SecondaryAccent = "#ff5a5a"

export const ColorBox = styled.p`
  padding: 0.4rem 1rem;
  background-color: ${Accent};
  border-radius: 0.3rem;
  width: fit-content;
`

export const Button = styled(ColorBox)`
  color: white;
  width: max-content;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  a {
    color: inherit;
    font: inherit;
    text-decoration: inherit;
  }
  :hover {
    text-decoration: underline;
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

export const Message = styled(ColorBox)`
  background-color: ${Secondary};
`

export const Error = styled(ColorBox)`
  background-color: ${SecondaryAccent};
`

export const Title = styled.h1`
  font-family: "Roboto Slab";
  padding-left: 1.5rem;
`
