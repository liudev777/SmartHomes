import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const { currentUser } = useUser();


  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // Calculate the totals
  const totals = cartItems.reduce(
    (acc, item) => {
      const price = parseFloat(item.price);
      const discount = parseFloat(item.discountAmount);
      const priceAfterDiscount = price - discount;

      acc.totalBeforeDiscount += price * item.quantity;
      acc.totalAfterDiscount += priceAfterDiscount * item.quantity;

      return acc;
    },
    { totalBeforeDiscount: 0, totalAfterDiscount: 0 }
  );

  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const handleClick = () => {
    if (!currentUser) {
      goToLogin();
      return;
    }

    goToCheckout();
    return;

  }


  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Discount Amount</th>
              <th>Price After Discount</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const price = parseFloat(item.price).toFixed(2);
              const discount = parseFloat(item.discountAmount).toFixed(2);
              const priceAfterDiscount = (price - discount).toFixed(2);

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${price}</td>
                  <td>${discount}</td>
                  <td>${priceAfterDiscount}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div>
        <p>
          Total Cost Before Discount: ${totals.totalBeforeDiscount.toFixed(2)}
        </p>
        <p>
          Total Cost After Discount: ${totals.totalAfterDiscount.toFixed(2)}
        </p>
        <button onClick={handleClick}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
