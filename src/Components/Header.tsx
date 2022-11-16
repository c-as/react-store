import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../Assets/logo.svg"
import styled from "styled-components"
import { CartContext } from "../State/Cart"
import { Accent, Primary } from "./Styles"

const Styled = styled.header`
  width: 100%;
  padding: 0.5em 2em;
  box-sizing: border-box;
  background-color: ${Primary};
  display: flex;
  a {
    color: white;
  }
  img {
    height: 3rem;
  }
  nav {
    margin-top: auto;
    margin-bottom: auto;
    padding-right: 1rem;
    a {
      padding: 0.5rem;
      margin-left: 0.5rem;
      text-decoration: none;
    }
    .active {
      color: ${Accent};
      font-weight: 1000;
    }
  }
`

const Title = styled.h1`
  font-family: "Roboto Slab";
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  a {
    text-decoration: none;
  }
`

export default function Header() {
  const { itemCount: cartSize } = useContext(CartContext)

  return (
    <Styled>
      <img src={logo} alt="" />
      <Title>
        <Link to="/">Atomic-Store</Link>
      </Title>
      <nav>
        <NavLink end to="/">
          Home
        </NavLink>
        <NavLink to="/catalog?isOnSale=true">Deals</NavLink>
        <NavLink to="/cart">Cart {cartSize > 0 && cartSize}</NavLink>
      </nav>
    </Styled>
  )
}
