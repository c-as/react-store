import React from "react"
import PropTypes from "prop-types"
import Item from "./Item"

export default function Catalog(props) {
  let items = []
  props.items.forEach((item) => {
    items.push(
      <Item
        id={item._id}
        name={item.name}
        price={item.price}
        rating={item.avgRating}
        isOnSale={item.isOnSale}
        image={item.imageUrl}
        key={item._id}
      />
    )
  })
  return (
    <div className="catalog">
      {items.length > 0 ? (
        items
      ) : (
        <div className="message">{props.message}</div>
      )}
    </div>
  )
}

Catalog.defaultProps = {
  items: PropTypes.array,
  message: "Currently no items to show",
}
