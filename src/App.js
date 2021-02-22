import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Components/Header"

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/cart">Your cart</Route>
        <Route path="/deals">Current deals</Route>
        <Route path="/">
          <img src={logo} alt="" height="100" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
