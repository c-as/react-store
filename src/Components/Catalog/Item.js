import React from "react"
import Rating from "../Rating"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import "./Item.css"

export default function Item({ image, name, id, rating, price, isOnSale }) {
  return (
    <div className="item">
      <div className="imgContainer">
        <span className="helper"></span>
        <img src={image} alt={name} />
      </div>
      <Link to={`/item/${id}`}>
        <header>{name}</header>
      </Link>
      <div className="info">
        <Rating score={rating} />
        <b> ${price} </b>
        {isOnSale && <span className="sale">On Sale</span>}
      </div>
      <Link to={`/item/${id}`}>
        <div className="button">View Item</div>
      </Link>
    </div>
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
