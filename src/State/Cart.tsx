import { createContext, useReducer, useMemo, Dispatch } from "react"
import { ProductInterface } from "../Lib/Api"

export enum CartActionType {
  Set,
  Remove,
  Clear,
}

export interface CartAction {
  product?: ProductInterface
  id?: string
  amount?: number
  type: CartActionType
}

interface CartState {
  products: { [index: string]: CartProductInterface }
}

interface CartContents {
  products: {
    [index: string]: CartProductInterface
  }
  productCount: number
  totalPrice: string
  dispatch: Dispatch<CartAction>
}

export interface CartProductInterface extends ProductInterface {
  amount: number
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionType.Set:
      if (!action.id) {
        throw Error("Product id not defined!")
      }
      let product = action.product || state.products[action.id]
      if (!product) {
        throw Error("Product data not defined!")
      }
      if (!action.amount) {
        throw Error("No amount")
      }
      if (action.amount > product.stockCount || product.stockCount === 0) {
        throw Error("Insufficient stock")
      }
      return {
        ...state,
        products: {
          ...state.products,
          [action.id]: {
            ...product,
            amount: action.amount,
          },
        },
      }

    case CartActionType.Remove:
      if (!action.id) {
        throw Error("Product id not defined!")
      }

      return {
        ...state,
        products: {
          ...state.products,
          [action.id]: {
            ...state.products[action.id],
            amount: 0,
          },
        },
      }
    case CartActionType.Clear:
      return {
        ...state,
        products: {},
      }
  }
}

export const CartContext = createContext<CartContents>({
  products: {},
  productCount: 0,
  totalPrice: Number(0).toFixed(2),
  dispatch: () => undefined,
})

export function Provider({ children }: { children: any }) {
  const [{ products }, dispatch] = useReducer(reducer, {
    products: {},
  })

  const [productCount, totalPrice] = useMemo(
    function () {
      let count = 0
      let price = 0
      Object.entries(products).forEach(([_, product]) => {
        count += product.amount
        price += product.price * product.amount
      })
      return [count, price.toFixed(2)]
    },
    [products]
  )

  return (
    <CartContext.Provider
      value={{ products, productCount, totalPrice, dispatch }}
    >
      {children}
    </CartContext.Provider>
  )
}
