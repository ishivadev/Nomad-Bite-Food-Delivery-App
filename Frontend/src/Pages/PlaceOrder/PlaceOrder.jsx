import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Stripe dummy card number for testing 4000003560000008

const PlaceOrder = () => {
  // Get the necessary data from the StoreContext
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext)

  // Initialize the state for the order form data
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
})

// Function to handle changes to the order form data
const onChangeHandler = (event) => {
  // Get the name and value of the input field that changed
  const name = event.target.name;
  const value = event.target.value;
  setData(data=> ({...data, [name]:value }))  // Update the state with the new value
}

// Function to place the order
const placeOder = async (event) => {
  event.preventDefault();  // Prevent the default form submission behavior
  let orderItems = [];
  // Loop through the food list and add items to the order if they are in the cart
  food_list.map((item) => {
    if(cartItems[item._id] > 0) {
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id]; // Create a copy of the item and add the quantity to it
      orderItems.push(itemInfo);
      //console.log("Iteminfo data = ", itemInfo);
    }
  })
  //console.log("OrderItem data = ", orderItems);

  // Create the order data object
  let orderData = {
    address:data,
    items:orderItems,
    amount: getTotalCartAmount()+2
  }

   // Send the order data to the server
  let response = await axios.post(url+"/api/order/place",orderData, {headers:{token}} )
  if(response.data.success){
    const {session_url} = response.data;  // Get the session URL from the response
    window.location.replace(session_url);   // Redirect the user to the session URL, session_url received from Stripe
  } else {
    alert("Error");
  }
}

const navigate = useNavigate();

  useEffect(() => {
   if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone No'/>
      </div>
      <div className="place-order-right">
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
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
      
    </form>
  )
}


export default PlaceOrder
