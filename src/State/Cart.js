import React, { createContext, useReducer, useMemo } from "react"

export const actions = {
  set: "SET",
  remove: "REMOVE",
  clear: "CLEAR",
}

function reducer(state, action) {
  switch (action.type) {
    case actions.set:
      let item = action.item || state.items[action.id]
      if (!item) {
        throw Error("Item data not defined!")
      }
      if (action.amount > item.stockCount || item.stockCount === 0) {
        throw Error("Insufficient Stock")
      }
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            ...item,
            amount: action.amount,
          },
        },
      }
    case actions.remove:
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            ...state.items[action.id],
            amount: 0,
          },
        },
      }
    case actions.clear:
      return {
        ...state,
        items: {},
      }
    default:
      throw Error("Action undefined")
  }
}

export const Context = createContext()

export function Provider(props) {
  const [state, dispatch] = useReducer(reducer, {
    items: {},
  })

  const [itemCount, totalPrice] = useMemo(
    function () {
      let count = 0
      let price = 0
      for (const id in state.items) {
        let item = state.items[id]
        count += item.amount
        price += item.price * item.amount
      }
      return [count, price.toFixed(2)]
    },
    [state.items]
  )

  return (
    <Context.Provider
      value={{ items: state.items, itemCount, totalPrice, dispatch }}
    >
      {props.children}
    </Context.Provider>
  )
}
