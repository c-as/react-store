import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartAction, CartActionType, CartContext } from "../State/Cart"
import CartItem from "../Components/CartItem"
import styled from "styled-components"
import { Message, Title } from "../Components/Styles"
import Button from "../Components/Button"

const Styled = styled.div`
  width: 60rem;
  max-width: 100%;
  margin: 0rem auto 0.5rem;
`

const Catalog = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`

const CartInfo = styled.div`
  display: flex;
  margin: 0rem 0.5rem;
  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`

const StyledButton = styled(Button)`
  margin: 0rem auto 0rem 0rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

export default function Cart() {
  const navigate = useNavigate()

  const {
    items: cart,
    itemCount,
    totalPrice,
    dispatch,
  } = useContext(CartContext)

  const items = itemCount > 0 ? Object.values(cart) : []

  return (
    <Styled>
      <Title>Your Cart</Title>
      <Catalog>
        {items.length > 0 ? (
          items.map((item) => <CartItem item={item} key={item._id} />)
        ) : (
          <Message>Cart is empty</Message>
        )}
      </Catalog>
      <CartInfo>
        {itemCount > 0 && (
          <>
            <StyledButton
              onClick={() => {
                dispatch({ type: CartActionType.Clear } as CartAction)
                navigate("/checkout")
              }}
            >
              Checkout
            </StyledButton>
            <span>
              {" "}
              {itemCount} Items, Total: ${totalPrice}
            </span>
          </>
        )}
      </CartInfo>
    </Styled>
  )
}
