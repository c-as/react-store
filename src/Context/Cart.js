import { createContext, useState, useMemo } from "react"

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

  function ItemCount() {
    return useMemo(
      function () {
        let count = 0
        for (const id in items) {
          count += items[id]
        }
        return count
      },
      [items]
    )
  }

  return (
    <Context.Provider
      value={{ items, setItem, updateItem, removeItem, ItemCount }}
    >
      {props.children}
    </Context.Provider>
  )
}
