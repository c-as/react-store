import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Deals from "./Pages/Deals"

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
      </Switch>
    </Router>
  )
}

export default App;
