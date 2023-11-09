import React, { useEffect, useState } from "react";
import { parseXML } from "../utility/ParseXML";
import "../styling/Products.css";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  // populates categories and products when system starts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("Products.xml");
        const text = await response.text();
        // console.log("Fetched XML:", text); // Check the fetched XML text
        const parsedProducts = parseXML(text);
        // console.log("Parsed Products:", parsedProducts); // Check the parsed products
        setCategories(Object.keys(parsedProducts));
        setProducts(parsedProducts);
      } catch (error) {
        console.error("Failed to load products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const renderProductList = () => (
    <div className="horizontal-scroll">
      {products[selectedCategory].map((product, index) => (
        <div key={index} className="product-card">
          <button
            key={product}
            onClick={() => {
              setSelectedProduct(product);
              console.log("clicked " + product.name);
            }}
            className={selectedProduct === product ? "active" : ""}
          >
            View
          </button>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );

  const renderProductDetails = () => (
    <div className="product-details">
      <button onClick={() => setSelectedProduct(null)}>Back to list</button>
      <p>{"id: " + selectedProduct.id}</p>
      <h2>{selectedProduct.name}</h2>
      <p>{"$" + selectedProduct.price}</p>
      <p>{selectedProduct.description}</p>
      <p>{"-$" + selectedProduct.discountAmount}</p>
      <p>{"Manufacturer Rebate: $" + selectedProduct.manufacturerRebate}</p>
      <p>{"Warranty Cost: $" + selectedProduct.warrantyCost}</p>
      <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
    </div>
  );

  return (
    <div className="products-container">
      <div className="side-nav">
        {/* make every category clickable */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedProduct(null);
            }}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="products-view">
        {selectedProduct
          ? renderProductDetails()
          : selectedCategory && renderProductList()}
      </div>
    </div>
  );
};

export default Products;
