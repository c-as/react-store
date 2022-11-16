import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../Assets/logo.svg"
import styled from "styled-components"
import { CartContext } from "../State/Cart"
import { Accent, Primary } from "./Styles"

const Styled = styled.header`
  width: 100%;
  padding: 0em 1em 0em 0rem;
  box-sizing: border-box;
  background-color: ${Primary};
  display: flex;
  a {
    color: white;
  }
  img {
    height: 4rem;
  }
  h2 {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
    a {
      text-decoration: none;
    }
  }
  nav {
    margin-top: auto;
    margin-bottom: auto;
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

export default function Header() {
  const { itemCount: cartSize } = useContext(CartContext)

  return (
    <Styled>
      <img src={logo} alt="" />
      <h2>
        <Link to="/">Atomic-Store</Link>
      </h2>
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
