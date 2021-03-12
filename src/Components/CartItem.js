import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "./Styles"
import { Context as CartContext } from "../Context/Cart"

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
`

const Title = styled.div`
  font-size: 1.5rem;
  display: flex;
  margin-bottom: 1rem;
  div {
    margin-left: auto;
    margin-right: 4rem;
    font-weight: bold;
  }
`

const ImgContainer = styled.div`
  float: left;
  height: 10rem;
  width: 15rem;
  margin-right: 2rem;
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

export default function CartItem({ item }) {
  const { items, removeItem, setItem } = useContext(CartContext)
  const quantity = items[item._id]

  return (
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
        <input
          type="number"
          min="0"
          max={item.stockCount}
          value={quantity}
          onChange={(event) => {
            setItem(item, Number(event.target.value))
          }}
          step="1"
        />
        <StyledButton
          onClick={() => {
            removeItem(item)
          }}
        >
          remove
        </StyledButton>
        <span>In stock: {item.stockCount}</span>
      </Menu>
    </Styled>
  )
}

CartItem.propTypes = {
  item: PropTypes.object,
}
