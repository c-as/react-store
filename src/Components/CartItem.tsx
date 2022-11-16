import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button, Input } from "./Styles"
import {
  CartContext,
  CartAction,
  CartActionType,
  CartItemInterface,
} from "../State/Cart"

const Styled = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  padding: 1rem;
  width: 100%;
  a {
    color: black;
    text-decoration: none;
  }
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

export default function CartItem({ item }: { item: CartItemInterface }) {
  const { dispatch } = useContext(CartContext)
  const [quantity, setQuantity] = useState(item.amount)

  function setItemQuantity() {
    if (quantity > item.stockCount) {
      alert("Insufficient Stock")
      setQuantity(item.amount)
      return
    }

    dispatch({
      id: item._id,
      amount: quantity,
      type: CartActionType.Set,
    } as CartAction)
  }

  return (
    <>
      {item.amount > 0 && (
        <Styled>
          <ImgContainer>
            <Helper />
            <img src={item.imageUrl} alt={item.name} />
          </ImgContainer>
          <Title>
            {" "}
            <Link to={`/item/${item._id}`}>{item.name} </Link>{" "}
            <div>${item.price}</div>
          </Title>
          <Menu>
            {"Quantity:  "}
            <Input
              type="number"
              min="0"
              max={item.stockCount}
              value={quantity}
              onChange={(event) => {
                setQuantity(Number(event.target.value))
              }}
              onBlur={setItemQuantity}
              onClick={setItemQuantity}
              step="1"
            />
            <StyledButton
              onClick={() => {
                dispatch({
                  id: item._id,
                  type: CartActionType.Remove,
                } as CartAction)
              }}
            >
              Remove
            </StyledButton>
            <span>In stock: {item.stockCount}</span>
          </Menu>
        </Styled>
      )}
    </>
  )
}
