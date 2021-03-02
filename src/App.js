import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Deals from "./Pages/Deals"
import Item from "./Pages/Item"
import Search from "./Pages/Search"

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/deals">
          <Deals />
        </Route>
        <Route path="/cart">Your cart</Route>
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route>
          <h1 style={{ textAlign: "center" }}>404 not found</h1>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
