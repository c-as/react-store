import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Input } from "./Styles"
import Button from "./Button"

import {
  CartContext,
  CartAction,
  CartActionType,
  CartProductInterface,
} from "../State/Cart"

const Styled = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  padding: 1rem;
  width: 100%;
  @media (orientation: portrait) {
    padding-bottom: 0.5rem;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  div {
    margin-left: auto;
    margin-right: 4rem;
    font-weight: bold;
  }
  @media (orientation: landscape) {
    display: flex;
  }
`

const ImgContainer = styled.div`
  @media (orientation: landscape) {
    float: left;
    width: 15rem;
    margin-right: 2rem;
  }
  @media (orientation: portrait) {
    float: left;
    width: 100%;
    display: block;
    margin-bottom: 2rem;
  }
  height: 10rem;
  text-align: center;

  img {
    vertical-align: middle;
    max-height: 100%;
    max-width: 100%;
  }
`

const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`

const Menu = styled.div`
  line-height: 3rem;
  input {
    height: 2.2rem;
  }
  * {
    margin-right: 1rem;
    :last-child {
      margin-right: 0rem;
    }
  }
`

const StyledButton = styled(Button)`
  display: inline;
`

export default function CartProduct({
  product,
}: {
  product: CartProductInterface
}) {
  const { dispatch } = useContext(CartContext)
  const [quantity, setQuantity] = useState(product.amount)

  function setProductQuantity() {
    if (quantity > product.stockCount) {
      alert("Insufficient Stock")
      setQuantity(product.amount)
      return
    }

    dispatch({
      id: product._id,
      amount: quantity,
      type: CartActionType.Set,
    } as CartAction)
  }

  return (
    <>
      {product.amount > 0 && (
        <Styled>
          <ImgContainer>
            <Helper />
            <img src={product.imageUrl} alt={product.name} />
          </ImgContainer>
          <Title>
            {" "}
            <Link to={`/product/${product._id}`}>{product.name} </Link>{" "}
            <div>${product.price}</div>
          </Title>
          <Menu>
            {"Quantity:  "}
            <Input
              type="number"
              min="0"
              max={product.stockCount}
              value={quantity}
              onChange={(event) => {
                setQuantity(Number(event.target.value))
              }}
              onBlur={setProductQuantity}
              onClick={setProductQuantity}
              step="1"
            />
            <StyledButton
              onClick={() => {
                dispatch({
                  id: product._id,
                  type: CartActionType.Remove,
                } as CartAction)
              }}
            >
              Remove
            </StyledButton>
            <span>In stock: {product.stockCount}</span>
          </Menu>
        </Styled>
      )}
    </>
  )
}
