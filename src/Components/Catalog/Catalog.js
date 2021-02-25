import React from "react"
import PropTypes from "prop-types"
import Item from "./Item"

export default function Catalog({ items, message = "Nothing to show" }) {
  return (
    <div className="catalog">
      {items.length > 0 ? (
        items.map((item) => (
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
        <div className="message">{message}</div>
      )}
    </div>
  )
}

Catalog.propTypes = {
  items: PropTypes.array,
  message: PropTypes.string,
}
