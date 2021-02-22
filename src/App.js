import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/deals">Current deals</Route>

        <Route path="/cart">Your cart</Route>
      </Switch>
    </Router>
  )
}

export default App;
