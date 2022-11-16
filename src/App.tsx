import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from "./Components/Header"
import Item from "./Pages/Item"
import Catalog from "./Pages/Catalog"
import Cart from "./Pages/Cart"
import Footer from "./Components/Footer"
import { Button } from "./Components/Styles"
import { Provider as CartProvider } from "./State/Cart"

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route
            path="/checkout"
            element={
              <div>
                <h2 style={{ textAlign: "center" }}>Thank you</h2>
                <Button style={{ margin: "auto" }}>
                  <Link to="/">Return to the home page </Link>
                </Button>
              </div>
            }
          />
          <Route
            path="*"
            element={<h1 style={{ textAlign: "center" }}>404 not found</h1>}
          />
        </Routes>
      </Router>
      <Footer>
        <a href="https://github.com/casbrugman/super-store">Source code</a>
      </Footer>
    </CartProvider>
  )
}

export default App
