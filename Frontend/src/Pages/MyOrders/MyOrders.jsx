import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';


const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
            setData(response.data.data)
            console.log(response.data.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        //console.log("Token value inside useEffect:", token);
        if (token) {
            fetchOrders();            
        } 
    },[token])


    // if (loading) {
    //     return <div>Loading...</div>; // Display a loading message
    //   }

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
      <div className="container">
            {data.map((order,index) => {
                return (
                    // Use a unique key for each order to help React keep track of the elements
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="parcel-logo" />
                        <p> 
                            {order.items.map((item,index) => { 
                                // Check if the current item is the last item in the list                               
                                if (index === order.items.length - 1) {
                                    return item.name+" x "+item.quantity // If it's the last item, return the item's name and quantity without a trailing comma
                                }
                                else {
                                    return item.name+" x "+item.quantity+" , "  // If it's not the last item, return the item's name and quantity with a trailing comma
                                }
                            })}
                        </p>                 
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
      </div>
    </div>
  )
}

export default MyOrders
