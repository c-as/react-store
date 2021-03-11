import React from "react"
import Rating from "../Rating"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Sale from "../Sale"
import ColorBox from "../ColorBox"

const Styled = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  text-align: center;
  padding: 1rem;
  width: 15rem;
  flex-grow: 1;
  a {
    color: black;
    text-decoration: none;
  }
  header {
    font-size: 1.5rem;
  }
`

const ImgContainer = styled.div`
  height: 15rem;
  margin-bottom: 1rem;
  img {
    vertical-align: middle;
    max-height: 100%;
    max-width: 100%;
  }
`
const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`

const Info = styled.div`
  text-align: left;
  h3 {
    display: inline;
  }
`

const Button = styled(ColorBox)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: max-content;
  margin: 2rem auto 0rem;
  background-color: orange;
  color: white;
`

const StyledSale = styled(Sale)`
  display: inline;
  font-size: 0.9rem;
`

export default function Item({ item }) {
  return (
    <Styled>
      <ImgContainer>
        <Helper />
        <img src={item.imageUrl} alt={item.name} />
      </ImgContainer>
      <Link to={`/item/${item._id}`}>
        <header>{item.name}</header>
      </Link>
      <Info>
        <Rating score={item.avgRating} />
        <h3> ${item.price} </h3>
        {item.isOnSale && <StyledSale>On Sale</StyledSale>}
      </Info>
      <Link to={`/item/${item._id}`}>
        <Button>View Item</Button>
      </Link>
    </Styled>
  )
}

Item.propTypes = {
  item: PropTypes.object,
}
