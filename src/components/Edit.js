import React, { useState } from "react";

const Edit = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });
  
  const handleAddProduct = () => {
    const productId = Date.now().toString(); // Simple ID generation
    const updatedProducts = { ...products };
    if (!updatedProducts[newProduct.category]) {
      updatedProducts[newProduct.category] = [];
    }
    updatedProducts[newProduct.category].push({ ...newProduct, id: productId });
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: "", category: "" }); // Reset form
  };

  const handleDeleteProduct = (categoryId, productId) => {
    const updatedCategoryProducts = products[categoryId].filter(product => product.id !== productId);
    setProducts({ ...products, [categoryId]: updatedCategoryProducts });
  };

  return (
    <div>
      <h2>Edit Products</h2>
      <div>
        <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" />
        <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price" />
        <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Category" />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        {Object.entries(products).map(([category, products]) => (
          <div key={category}>
            <h3>{category}</h3>
            {products.map(product => (
              <div key={product.id}>
                <span>{product.name}</span>
                <button onClick={() => handleDeleteProduct(category, product.id)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Edit;
