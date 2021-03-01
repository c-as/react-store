import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Deals from "./Pages/Deals"
import Item from "./Pages/Item"

function App() {
  return (
    <Router>
      <Header />
      <div className="pageContainer">
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
        </Switch>
      </div>
    </Router>
  )
}

export default App
