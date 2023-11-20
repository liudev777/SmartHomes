import React, { useEffect, useState } from "react";
import { parseXML } from "../utility/ParseXML";
import "../styling/Products.css";
import { useCart } from "../context/CartContext";
import Edit from "./Edit";
import { useUser } from "../context/UserContext";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const { currentUser } = useUser();

  const productAccessories = {
    1: [3, 4],
    2: [5, 6],
    4: [6, 7],
    6: [6, 7],
    9: [6, 7],
    11: [6, 7],
    15: [6, 7],
  };

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
        setSelectedProduct(products[0]);
      } catch (error) {
        console.error("Failed to load products: ", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // After products are set, select the first product of the first category
    if (categories.length > 0 && products[categories[0]].length > 0) {
      setSelectedProduct(products[categories[0]][0]);
    }
  }, [categories, products]);

  const renderProductList = () => (
    <div className="horizontal-scroll">
      {products[selectedCategory].map((product) => (
        <div key={product.id} className="product-card">
          {" "}
          <button
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
          <button
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );

  const renderAccessories = () => {
    if (!selectedProduct || !productAccessories[selectedProduct.id])
      return null;

    const allProducts = Object.values(products).flat();
    console.log("All Products:", allProducts); // Debugging to see all products

    const accessoryIds = productAccessories[selectedProduct.id];
    console.log("Accessory IDs:", accessoryIds); // Debugging to check accessory IDs

    const accessoryItems = accessoryIds
      .map((accessoryId) =>
        allProducts.find((product) => product.id === accessoryId)
      )
      .filter((accessory) => accessory !== undefined); // Filter out undefined values

    console.log("Accessory Items:", accessoryItems); // Debugging to see found accessories

    return (
      <div className="accessories-container">
        {accessoryItems.map((accessory) => (
          <div key={accessory.id} className="accessory-card">
            <h4>{accessory.name}</h4>
            <p>{"$" + accessory.price}</p>
            <button onClick={() => addToCart(accessory)}>Buy Accessory</button>
          </div>
        ))}
      </div>
    );
  };

  const buyWarranty = (product) => {
    const warrantyProduct = {
      ...product,
      id: `warranty-${product.id}`,
      name: `${product.name} - Warranty`,
      price: product.warrantyCost,
      warrantyPurchased: true,
    };
    addToCart(warrantyProduct);
  };

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
      {renderAccessories()}
      <button
        onClick={() => {
          buyWarranty(selectedProduct);
        }}
      >
        Buy Warranty
      </button>
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
      {currentUser && currentUser.role === "manager" && (
        <Edit products={products} setProducts={setProducts} />
      )}
    </div>
  );
};

export default Products;
