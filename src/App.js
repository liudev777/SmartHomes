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
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { OrderProvider } from "./context/OrderContext";
import Edit from "./components/Edit";
import Salesman from "./components/Salesman";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <main className="App-content">
          <UserProvider>
          <OrderProvider>
          <CartProvider>
            <Routes>
              <Route path="/home" element={<Landing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/salesman" element={<Salesman />} />
            </Routes>
          </CartProvider>
          </OrderProvider>
          </UserProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
