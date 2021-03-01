import React from "react"
import Rating from "../Rating"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Styled = styled.div`
  margin: 6px;
  border: 2px solid gray;
  text-align: center;
  padding: 1rem;
  width: 20rem;
  a {
    color: black;
    text-decoration: none;
  }
  header {
    font-size: 1.5rem;
  }
`

const ImgContainer = styled.div`
  height: 20rem;
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
`

const Sale = styled.span`
  display: block;
  width: fit-content;
  float: inline-start;
  font-size: 0.8rem;
  margin: 0rem 0.5rem 0rem 0rem;
  background-color: red;
  color: white;
  padding: 0.2rem;
  border-radius: 0.15rem;
`

const Button = styled.div`
  display: block;
  width: 6rem;
  margin: 0.5rem auto 0rem;
  color: white;
  background-color: orange;
  padding: 0.4rem;
  border-radius: 0.2rem;
  text-decoration: none;
`

export default function Item({ image, name, id, rating, price, isOnSale }) {
  return (
    <Styled>
      <ImgContainer>
        <Helper />
        <img src={image} alt={name} />
      </ImgContainer>
      <Link to={`/item/${id}`}>
        <header>{name}</header>
      </Link>
      <Info>
        <Rating score={rating} />
        <b> ${price} </b>
        {isOnSale && <Sale className="sale">On Sale</Sale>}
      </Info>
      <Link to={`/item/${id}`}>
        <Button>View Item</Button>
      </Link>
    </Styled>
  )
}

Item.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  isOnSale: PropTypes.bool,
  image: PropTypes.string,
}
