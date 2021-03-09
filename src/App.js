import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"
import Item from "./Pages/Item"
import List from "./Pages/List"

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/cart">Your cart</Route>
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
  )
}

export default App
