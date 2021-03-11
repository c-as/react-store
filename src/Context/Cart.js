import { createContext, useState } from "react"

export const Context = createContext()

export function Provider(props) {
  const [items, setItems] = useState({})

  function addItem(item, amount = 1) {
    const id = item._id
    const newAmount = (items[id] || 0) + amount

    if (amount === 0 || newAmount > item.stockCount) {
      throw Error("Insufficient Stock")
    }
    setItems({ ...items, [id]: newAmount })
  }

  return (
    <Context.Provider value={{ items, setItems, addItem }}>
      {props.children}
    </Context.Provider>
  )
}
