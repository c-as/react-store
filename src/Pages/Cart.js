import React, { useContext } from "react"
import { Context as CartContext } from "../Context/Cart"

export default function Cart() {
  const { items } = useContext(CartContext)

  return <div>{JSON.stringify(items)}</div>
}
