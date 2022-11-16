import styled from "styled-components"

const Outer = styled.div`
  height: 2.5rem;
`

const Inner = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  clear: both;
  padding: 1rem 0rem;
`

export default function Footer({ children }: { children: any }) {
  return (
    <Outer>
      <Inner>{children}</Inner>
    </Outer>
  )
}
