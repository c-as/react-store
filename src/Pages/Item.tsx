import { useState, useEffect, useContext, ChangeEvent } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Rating from "../Components/Rating"
import Sale from "../Components/Sale"
import { ColorBox, Button, Input, Title } from "../Components/Styles"
import useItem from "../Hooks/useItem"
import { CartContext, CartAction, CartActionType } from "../State/Cart"

const Styled = styled.div`
  @media (orientation: landscape) {
    box-sizing: border-box;
    width: 70rem;
    max-width: 100%;
    margin: 0rem auto;
    padding: 5rem 5rem;
  }
  @media (orientation: portrait) {
    margin: 1rem 3rem 3rem;
  }
`

const seperation = 2

const ProductImg = styled.img`
  @media (orientation: landscape) {
    width: calc(50% - ${seperation / 2.0}rem);
    float: left;
    padding-right: ${seperation / 2.0}rem;
  }
  @media (orientation: portrait) {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`

const Info = styled.div`
  @media (orientation: landscape) {
    width: calc(50% - ${seperation / 2.0}rem);
    float: right;
    padding-left: ${seperation / 2.0}rem;
  }
  input {
    margin-right: 1rem;
  }
  span {
    display: inline-block;
  }
`

const StyledButton = styled(Button)`
  width: 6rem;
`

const StockWarning = styled(ColorBox)`
  background-color: lightpink;
`

const CartWarning = styled(ColorBox)`
  background-color: lightblue;
`

const Message = styled(ColorBox)`
  background-color: lightgray;
  margin: 0rem auto;
  width: fit-content;
`

const Error = styled(Message)`
  background-color: lightpink;
`

const Name = styled(Title)`
  padding: 0;
`

export default function Item() {
  const params = useParams()

  const { item, isLoading, error } = useItem(params.id)

  const [quantity, setQuantity] = useState(0)

  const { items: cart, dispatch } = useContext(CartContext)

  useEffect(() => {
    if (item && item.stockCount > 0) {
      setQuantity(1)
    }
  }, [item])

  function quantityChanged(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setQuantity(Number(value))
  }

  const inCart = (params.id && cart[params.id] && cart[params.id].amount) || 0

  function addToCart() {
    if (item) {
      if (quantity + inCart > item.stockCount || item.stockCount === 0) {
        alert("Insufficient Stock")
        return
      }

      dispatch({
        id: item._id,
        item: item,
        amount: quantity + inCart,
        type: CartActionType.Set,
      } as CartAction)
      alert(`Added ${quantity} to cart`)
    }
  }

  return (
    <Styled>
      {item ? (
        <div>
          <ProductImg src={item.imageUrl} alt={item.name} />
          <Info>
            <Name>{item.name}</Name>
            {item.isOnSale && <Sale>On Sale</Sale>}
            <Rating score={item.avgRating} />
            <p>{item.description}</p>
            <h3>${item.price}</h3>
            <p>
              <Input
                type="number"
                min="1"
                max={item.stockCount}
                value={quantity}
                onChange={(event) => quantityChanged(event)}
                step="1"
              />
              <span>In stock: {item.stockCount}</span>
            </p>
            <StyledButton onClick={(event) => addToCart()}>
              Add to cart
            </StyledButton>
            {(item.stockCount < 1 || quantity > item.stockCount) && (
              <StockWarning>Insufficient stock!</StockWarning>
            )}
            {inCart > 0 && (
              <CartWarning>
                {inCart} of this item is currently in your cart.
              </CartWarning>
            )}
          </Info>
        </div>
      ) : isLoading ? (
        <Message>Fetching item..</Message>
      ) : (
        <Error>{error && error.toString()}</Error>
      )}
    </Styled>
  )
}
