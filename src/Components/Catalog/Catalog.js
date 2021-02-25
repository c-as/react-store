import React from "react"
import PropTypes from "prop-types"
import Item from "./Item"

export default function Catalog(props) {
  return (
    <div className="catalog">
      {props.items.length > 0 ? (
        props.items.map((item) => (
          <Item
            id={item._id}
            name={item.name}
            price={item.price}
            rating={item.avgRating}
            isOnSale={item.isOnSale}
            image={item.imageUrl}
            key={item._id}
          />
        ))
      ) : (
        <div className="message">{props.message}</div>
      )}
    </div>
  )
}

Catalog.propTypes = {
  items: PropTypes.array,
  message: "Currently no items to show",
}
