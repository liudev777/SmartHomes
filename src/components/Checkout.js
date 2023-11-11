import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useOrder } from "../context/OrderContext";

const Checkout = () => {
  const [formData, setFormData] = useState({
    address: "", // Store only the address
    creditCard: "",
    deliveryMethod: "delivery",
    storeZipCode: "",
  });
  const chicagoZipCodes = [
    "60601", "60602", "60603", "60604", "60605",
    "60606", "60607", "60608", "60609", "60610"
  ];

  const { updateCheckoutInfo } = useUser();
  const { orderNumber, incrementOrderNumber } = useOrder();
  const { cartItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    incrementOrderNumber();
    const now = new Date();
    const updatedFormData = {
      address: formData.address,
      orderNumber: orderNumber + 1,
      orderDate: now.toISOString(),
      status: "On the Way",
      cartItems,
      zipCode: formData.deliveryMethod === 'pickup' ? formData.storeZipCode : formData.zipCode,
      deliveryMethod: formData.deliveryMethod, // Set delivery method based on user selection
      creditCard: formData.creditCard
    };
    updateCheckoutInfo(updatedFormData);
    console.log("Checkout Data:", updatedFormData);
    clearCart();
    setOrderPlaced(true);
  };

  // Render logic for order confirmation
  const orderConfirmation = orderPlaced ? (
    <div>
      <p>Your order has been placed.</p>
      <p>Order Confirmation Number: {orderNumber}</p>
    </div>
  ) : null;

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="creditCard"
          placeholder="Credit Card Number"
          onChange={handleInputChange}
          required
        />
        <div>
          <label>
            <input type="radio" name="deliveryMethod" value="delivery" checked={formData.deliveryMethod === "delivery"} onChange={handleInputChange} />
            Home Delivery
          </label>
          <label>
            <input type="radio" name="deliveryMethod" value="pickup" checked={formData.deliveryMethod === "pickup"} onChange={handleInputChange} />
            Store Pickup
          </label>
        </div>
        {formData.deliveryMethod === "pickup" && (
          <select name="storeZipCode" value={formData.storeZipCode} onChange={handleInputChange} required>
            {chicagoZipCodes.map(zipCode => (
              <option key={zipCode} value={zipCode}>{zipCode}</option>
            ))}
          </select>
        )}
        <button type="submit">Complete Order</button>
      </form>
      {orderConfirmation}
    </div>
  );
};

export default Checkout;
