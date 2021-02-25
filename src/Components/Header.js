import React from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../Assets/logo.svg"

export default function header() {
  return (
    <header className="header">
      <img src={logo} alt="" />
      <h2>
        <Link to="/">Store</Link>
      </h2>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/deals">Deals</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </header>
  )
}
