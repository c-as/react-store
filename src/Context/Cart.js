import { createContext, useState } from "react"

export const Context = createContext()

export function Provider(props) {
  const [items, setItems] = useState({})

  function setItem(item, amount) {
    const id = item._id

    if (amount > item.stockCount || item.stockCount === 0) {
      throw Error("Insufficient Stock")
    }
    setItems((items) => {
      return { ...items, [id]: amount }
    })
  }

  function updateItem(item, amount) {
    const id = item._id
    const newAmount = (items[id] || 0) + amount

    try {
      setItem(item, newAmount)
    } catch (error) {
      throw error
    }
  }

  function removeItem(item) {
    setItem(item, 0)
  }

  return (
    <Context.Provider value={{ items, setItem, updateItem, removeItem }}>
      {props.children}
    </Context.Provider>
  )
}
