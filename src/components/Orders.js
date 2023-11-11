import React from 'react';
import { useUser } from '../context/UserContext';

const Orders = () => {
  const { currentUser, updateUserOrders } = useUser(); 

  // Calculate price after discount
  const getPriceAfterDiscount = (price, discount) => {
    // Assuming discount is a percentage
    return discount ? (price - (price * (discount / 100))).toFixed(2) : price;
  };

  const isOrderCancelable = (orderDate) => {
    const orderPlacedDate = new Date(orderDate);
    const cancelDeadline = new Date(orderPlacedDate.getTime() + 9 * 24 * 60 * 60 * 1000); // 9 days after order
    return new Date() < cancelDeadline;
  };
  
  const getOrderStatus = (orderDate, status) => {
    if (status === "Cancelled") return status;
  
    const orderPlacedDate = new Date(orderDate);
    const completionDate = new Date(orderPlacedDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days after order
  
    if (new Date() >= completionDate) {
      return "Completed";
    }
    return status;
  };

  const handleCancelOrder = (orderNumber) => {
    // Logic to find the order by orderNumber and update its status to "Cancelled"
    const updatedOrders = currentUser.orders.map(order => {
      if (order.orderNumber === orderNumber && isOrderCancelable(order.orderDate)) {
        return { ...order, status: "Cancelled" };
      }
      return order;
    });
    updateUserOrders(updatedOrders); // Update the user's orders in the context
  };

  const renderCancelOrderButton = (order) => {
    if (isOrderCancelable(order.orderDate) && order.status !== "Cancelled") {
      return (
        <button onClick={() => handleCancelOrder(order.orderNumber)}>Cancel Order</button>
      );
    }
    return null;
  };

  // Render the products in a single order
  const renderOrderProducts = (products) => {
    return products.map((product, index) => (
      <tr key={index}>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.discountAmount}</td>
        <td>${getPriceAfterDiscount(product.price, product.discountAmount)}</td>
      </tr>
    ));
  };

  const renderCheckouts = () => {
    if (currentUser && currentUser.orders && currentUser.orders.length > 0) {
      return currentUser.orders.map((checkout, index) => {
        const status = getOrderStatus(checkout.orderDate, checkout.status);

        return (
          <tr key={index}>
            <td>{checkout.orderNumber}</td>
            <td>{checkout.name}</td>
            <td>{checkout.deliveryMethod === 'pickup' ? `Pickup (${checkout.zipCode})` : 'Delivery'}</td>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Price After Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {checkout.cartItems && renderOrderProducts(checkout.cartItems)}
                </tbody>
              </table>
            </td>
            <td>{status}</td>
            <td>{renderCancelOrderButton(checkout)}</td>
          </tr>
        );
      });
    } else {
      return <p>No orders found.</p>;
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Name</th>
            <th>Delivery Method</th>
            <th>Order Details</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderCheckouts()}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;