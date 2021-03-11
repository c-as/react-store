import React from "react"
import PropTypes from "prop-types"
import Item from "./Item"
import styled from "styled-components"
import ColorBox from "../ColorBox"

const Styled = styled.div`
  width: 95rem;
  max-width: 100%;
  margin: 0rem auto;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`

const StyledColorBox = styled(ColorBox)`
  background-color: moccasin;
`

export default function Catalog({
  items = [],
  message = "Nothing to show",
  isLoading = false,
}) {
  return (
    <Styled>
      {items.length > 0
        ? items.map((item) => <Item item={item} />)
        : !isLoading && <StyledColorBox>{message}</StyledColorBox>}
    </Styled>
  )
}

Catalog.propTypes = {
  items: PropTypes.array,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
}
