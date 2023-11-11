import React from "react";
import { Link } from 'react-router-dom';
import "../styling/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
          <Link to="/edit" className="navbar-link">
            Edit
          </Link>
        </div>
        <div className="navbar-login">
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
