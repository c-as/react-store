import React from "react"
import styled from "styled-components"

const Styled = styled.div`
  width: fit-content;
  float: inline-start;
  font-size: 0.8rem;
  margin: 0rem 0.5rem 0rem 0rem;
  background-color: red;
  color: white;
  padding: 0.2rem;
  border-radius: 0.15rem;
`

export default function Sale(props) {
  return <Styled>{props.children}</Styled>
}
