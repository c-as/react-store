import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Context as CartContext, actions } from "../State/Cart"
import Catalog from "../Components/Catalog"
import CartItem from "../Components/CartItem"
import styled from "styled-components"
import { Button } from "../Components/Styles"

const Styled = styled.div`
  width: 70rem;
  max-width: 100%;
  margin: 0rem auto 0.5rem;
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
  const history = useHistory()

  const { items: cart, itemCount, totalPrice, dispatch } = useContext(
    CartContext
  )

  const items = itemCount > 0 ? cart : []

  return (
    <Styled>
      <Catalog
        items={Object.values(items)}
        ItemElement={CartItem}
        message={"Cart is empty"}
      />
      <CartInfo>
        {itemCount > 0 && (
          <>
            <StyledButton
              onClick={() => {
                dispatch({ type: actions.clear })
                history.push("/checkout")
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
