import styled from "styled-components"
import { Primary } from "./Styles"

const Outer = styled.div`
  height: 3.5rem;
`

const Inner = styled.div`
  position: absolute;
  bottom: 0;
  text-align: right;
  width: 100%;
  clear: both;
  padding: 1rem 0rem;
  background-color: ${Primary};
  color: white;
`

const Source = styled.a`
  text-align: right;
  padding: 1rem;
`

export default function Footer() {
  return (
    <Outer>
      <Inner>
        <Source href="https://github.com/casbrugman/super-store">
          Source code
        </Source>
      </Inner>
    </Outer>
  )
}
