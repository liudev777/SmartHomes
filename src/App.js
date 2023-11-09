import logo from "./logo.svg";
import "./styling/App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from "./components/Landing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <main className="App-content">
          <CartProvider>
            <Routes>
              <Route path="/home" element={<Landing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </CartProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
