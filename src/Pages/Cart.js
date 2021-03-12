import React, { useContext, useState, useEffect, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { Context as CartContext } from "../Context/Cart"
import Catalog from "../Components/Catalog"
import CartItem from "../Components/CartItem"
import { fetchItem } from "../Lib/Api"
import styled from "styled-components"
import { Button } from "../Components/Styles"

const Styled = styled.div`
  width: 95rem;
  max-width: 100%;
  margin: 0rem auto;
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

  const { items: cart, setItem, clearCart, ItemCount } = useContext(CartContext)

  const [items, setItems] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  //DEBUG
  useEffect(() => {
    setItem({ _id: "5fbfff7d58aa65167efb52b5" }, 1)
    setItem({ _id: "5fbfff7d58aa65167efb52af" }, 2)
  }, [])

  useEffect(
    function () {
      async function getItems() {
        setIsLoading(true)
        setMessage("")
        try {
          let list = {}
          for (const id in cart) {
            if (!cart[id] > 0) {
              continue
            }

            if (items[id]) {
              list[id] = items[id]
              continue
            }

            const item = await fetchItem(id)
            list[id] = item
          }
          setItems(list)

          if (!Object.keys(list).length > 0) {
            setMessage("Cart is empty")
          }
        } catch (error) {
          setMessage(error.toString())
        } finally {
          setIsLoading(false)
        }
      }
      getItems()
    },
    [cart]
  )

  const price = useMemo(
    function () {
      if (!items) {
        return 0
      }

      let price = 0
      Object.values(items).forEach((item) => {
        price += item.price
      })

      return Math.round(price * 100) / 100
    },
    [items]
  )

  const itemCount = ItemCount()

  return (
    <Styled>
      <Catalog
        items={Object.values(items)}
        ItemElement={CartItem}
        isLoading={isLoading}
        message={message}
      />
      <CartInfo>
        {Object.values(items).length > 0 && (
          <>
            <StyledButton
              onClick={() => {
                clearCart()
                history.push("/checkout")
              }}
            >
              Checkout
            </StyledButton>
            <span>
              {" "}
              {itemCount} Items, Total: ${price}
            </span>
          </>
        )}
      </CartInfo>
    </Styled>
  )
}
