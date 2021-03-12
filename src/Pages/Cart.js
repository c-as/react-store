import React, { useContext, useState, useEffect, useMemo } from "react"
import { Context as CartContext } from "../Context/Cart"
import Catalog from "../Components/Catalog"
import CartItem from "../Components/CartItem"
import { fetchItem } from "../Lib/Api"
import styled from "styled-components"
import { ColorBox } from "../Components/Styles"

const Button = styled(ColorBox)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: max-content;
  margin: 2rem auto 0rem;
  background-color: orange;
  color: white;
  cursor: pointer;
`

export default function Cart() {
  const { items: cart, setItem, ItemCount } = useContext(CartContext)

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
      return price
    },
    [items]
  )

  const itemCount = ItemCount()

  return (
    <div>
      <Catalog
        items={Object.values(items)}
        ItemElement={CartItem}
        isLoading={isLoading}
        message={message}
      />
      {itemCount} Items
      {Object.values(items).length > 0 && (
        <>
          <Button>Checkout</Button> <div>Total: ${price}</div>
        </>
      )}
    </div>
  )
}
