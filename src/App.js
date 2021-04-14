import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Header from "./Components/Header"
import Item from "./Pages/Item"
import List from "./Pages/List"
import Cart from "./Pages/Cart"
import { Button } from "./Components/Styles"
import { Provider as CartProvider } from "./State/Cart"

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
          <Route path="/checkout">
            <h2 style={{ textAlign: "center" }}>Thank you</h2>
            <Button style={{ margin: "auto" }}>
              <Link to="/">Return to the home page </Link>
            </Button>
          </Route>
          <Route>
            <h1 style={{ textAlign: "center" }}>404 not found</h1>
          </Route>
        </Switch>
      </Router>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          clear: "both",
          padding: "1rem 0rem",
        }}
      >
        <a href="https://github.com/casbrugman/super-store">Source code</a>
      </div>
    </CartProvider>
  )
}

export default App
