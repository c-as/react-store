import React, { useContext, useState, useEffect } from "react"
import { Context as CartContext } from "../Context/Cart"
import Catalog from "../Components/Catalog"
import CatalogItem from "../Components/CatalogItem"
import { fetchItem } from "../Lib/Api"

export default function Cart() {
  const { items: cart } = useContext(CartContext)

  const [items, setItems] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(
    function () {
      async function getItems() {
        setIsLoading(true)
        setMessage("")
        try {
          let list = []

          for (const id in cart) {
            console.log(id)
            const item = await fetchItem(id)
            list.push(item)
          }
          setItems(list)
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

  return (
    <div>
      {JSON.stringify(cart)}
      <Catalog
        items={items}
        ItemElement={CatalogItem}
        isLoading={isLoading}
        message={message}
      />
    </div>
  )
}
