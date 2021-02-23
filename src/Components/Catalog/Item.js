import React from 'react'
import Rating from "../Rating"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function Item(props) {
  return (
    <div className="item">
      <div className="imgContainer">
        <span className="helper"></span>
        <img src={props.image} alt={props.name} />
      </div>
      <header>{props.name}</header>
      <div className="info">
        <Rating score={props.rating} />
        <b> ${props.price} </b>
        {
          props.isOnSale && <span className="sale">On Sale</span>
        }
      </div>

      <Link to={`/item/${props.id}`}>
        View Item
      </Link>
    </div>
  )
}

Item.defaultProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  isOnSale: PropTypes.bool,
  image: PropTypes.string
}


