import { createContext, useReducer, useMemo, Dispatch } from "react"
import { ItemInterface } from "../Lib/Api"

export enum CartActionType {
  Set,
  Remove,
  Clear,
}

export interface CartAction {
  item?: ItemInterface
  id?: string
  amount?: number
  type: CartActionType
}

interface CartState {
  items: { [index: string]: CartItemInterface }
}

interface CartContents {
  items: {
    [index: string]: CartItemInterface
  }
  itemCount: number
  totalPrice: string
  dispatch: Dispatch<CartAction>
}

export interface CartItemInterface extends ItemInterface {
  amount: number
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionType.Set:
      if (!action.id) {
        throw Error("Item id not defined!")
      }
      let item = action.item || state.items[action.id]
      if (!item) {
        throw Error("Item data not defined!")
      }
      if (!action.amount) {
        throw Error("No amount")
      }
      if (action.amount > item.stockCount || item.stockCount === 0) {
        throw Error("Insufficient stock")
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

    case CartActionType.Remove:
      if (!action.id) {
        throw Error("Item id not defined!")
      }

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
    case CartActionType.Clear:
      return {
        ...state,
        items: {},
      }
  }
}

export const CartContext = createContext<CartContents>({
  items: {},
  itemCount: 0,
  totalPrice: Number(0).toFixed(2),
  dispatch: () => undefined,
})

export function Provider({ children }: { children: any }) {
  const [{ items }, dispatch] = useReducer(reducer, {
    items: {},
  })

  const [itemCount, totalPrice] = useMemo(
    function () {
      let count = 0
      let price = 0
      Object.entries(items).forEach(([_, item]) => {
        count += item.amount
        price += item.price * item.amount
      })
      return [count, price.toFixed(2)]
    },
    [items]
  )

  return (
    <CartContext.Provider value={{ items, itemCount, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
