// Import necessary dependencies
import React, { useContext } from "react";
import "./Cart.css"; // Import CSS styles for the Cart component
import { StoreContext } from "../../Context/StoreContext"; // Import the StoreContext for accessing cart data
import { useNavigate } from "react-router-dom";

// Define the Cart component
const Cart = () => {
  // Use the useContext hook to access cart data and functions from the StoreContext
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  // Render the Cart component
  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        </div>
        <br />
        <hr />
        {/* Map through the food list and render each item in the cart */}
        {food_list.map((item, index) => {
          // Only render items that have a quantity greater than 0 in the cart
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="food-item" />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  {/* Item quantity */}
                  <p>{cartItems[item._id]}</p>
                  {/* Item total price */}
                  <p>$ {item.price * cartItems[item._id]}</p>
                  {/* Remove item function from StoreContext with the button */}
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      {/* Cart bottom section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            {/* Fetching the Subtotal amount from StoreContext */}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* Delivery fee */}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            {/* Fetching the Total amount from StoreContext */}
            <div className="cart-total-details">
              <p>Total</p>
              <p>$ {getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            <hr />
          </div>
          <button onClick={() => navigate('/order')} >PROCEED TO CHECKOUT</button>
        </div>
        {/* Promo code section */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, please enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Cart component
export default Cart;