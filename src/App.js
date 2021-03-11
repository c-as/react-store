import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"
import Item from "./Pages/Item"
import List from "./Pages/List"
import Cart from "./Pages/Cart"
import { Provider as CartProvider } from "./Context/Cart"

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/item/:id">
            <Item />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route>
            <h1 style={{ textAlign: "center" }}>404 not found</h1>
          </Route>
        </Switch>
      </Router>
    </CartProvider>
  )
}

export default App
