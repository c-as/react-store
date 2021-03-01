import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Api from "../Lib/Api"
import styled from "styled-components"
import Rating from "../Components/Rating"
import Sale from "../Components/Sale"
import ColorBox from "../Components/ColorBox"

const Styled = styled.div`
  width: 60rem;
  max-width: 100%;
  margin: 5rem auto;
`

const ProductImg = styled.img`
  width: 50%;
  float: left;
`

const Info = styled.div`
  width: 50%;
  float: right;

  input {
    margin-right: 1rem;
  }
`

const Button = styled.div`
  text-align: center;
  width: 6rem;
  color: white;
  background-color: orange;
  padding: 0.4rem;
  border-radius: 0.2rem;
  text-decoration: none;
  cursor: pointer;
`

const StockWarning = styled(ColorBox)`
  background-color: lightpink;
`

const CartWarning = styled(ColorBox)`
  background-color: lightblue;
`

const Error = styled(ColorBox)`
  background-color: lightpink;
  margin: 0rem auto;
  width: fit-content;
`

function Item(props) {
  const [item, setItem] = useState()
  const [quantity, setQuantity] = useState(0)

  useEffect(
    function () {
      async function fetchData() {
        try {
          let item = await Api.getItem(props.match.params.id)
          setItem(item)

          if (item.stockCount > 0) {
            setQuantity(1)
          }
        } catch (error) {
          setItem()
        }
      }

      fetchData()
    },
    [props.match.params.id]
  )

  function quantityChanged(event) {
    const { value } = event.target
    setQuantity(value)
  }

  function addToCart(event) {
    if (quantity > 0) {
      alert(`${quantity} added to cart.`)
    } else {
      alert("Out of stock!")
    }
  }

  return (
    <Styled>
      {item ? (
        <div>
          <ProductImg src={item.imageUrl} alt={item.name} />
          <Info>
            <h2>{item.name}</h2>
            {item.isOnSale && <Sale>On Sale</Sale>}
            <Rating score={item.avgRating} />
            <p>{item.description}</p>
            <h3>${item.price}</h3>
            <p>
              Quantity:{" "}
              <input
                type="number"
                min="1"
                max={item.stockCount}
                value={quantity}
                onChange={(event) => quantityChanged(event)}
                step="1"
              />
              In stock: {item.stockCount}
            </p>
            <Button onClick={(event) => addToCart(event)}>Add to cart</Button>
            {(item.stockCount < 1 || quantity > item.stockCount) && (
              <StockWarning>Insufficient stock!</StockWarning>
            )}
            <CartWarning>1 of this item is currently in your cart.</CartWarning>
          </Info>
        </div>
      ) : (
        <Error>Could not fetch item</Error>
      )}
    </Styled>
  )
}

export default withRouter(Item)
