import { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../Assets/logo.svg"
import styled from "styled-components"
import { CartContext } from "../State/Cart"
import { Accent, ColorBox, Primary } from "./Styles"
import SearchBar from "./SearchBar"

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
`

const CartIndicator = styled(ColorBox)`
  display: inline;
`

export default function Header() {
  const { productCount: cartSize } = useContext(CartContext)
  const navigate = useNavigate()

  function onSearch(query: string) {
    if (query.length > 0) {
      navigate(`/catalog?q=${query}`)
    } else {
      navigate(`/`)
    }
  }

  return (
    <>
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
          <NavLink to="/cart">Cart</NavLink>
          {cartSize > 0 && <CartIndicator>{cartSize}</CartIndicator>}
        </nav>
      </Styled>
      <SearchBar onSearch={onSearch} />
    </>
  )
}
