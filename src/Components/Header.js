import React from 'react'
import { NavLink } from "react-router-dom"

export default function header() {
  return (
    <header>
      <h2>Store</h2>
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/deals">Deals</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </header>
  )
}
