import { createContext,  useEffect,  useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const url = "https://nomad-bite-backend.onrender.com"
    // const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    //Adding item function
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }

        if(token) {
            await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}} )
        }
    }

    //Remove item function
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))

        if(token) {
            await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
        }
    }

    //Get cartData as per token (token contaimns userId)
    const loadCartData = async (token) => {
        //console.log(token);
        
        const response =  await axios.post(url+"/api/cart/get", {}, {headers: {token}}) //'token' sent from here will be use in middleware > auth.js
        setCartItems(response.data.cartData)
        //console.log(response.data.cartData);
        
    }   
    

     //This useEffect hook is used to load data 
     useEffect(() => {
        async function loadData() {  // Define an async function to load data
            await fetchFoodList();    // Fetch the food list from the fetchFoodList function
            if (localStorage.getItem("token")) { //Check and keep sign-in user if the token if available
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token")) //Passing the token here
            }
        }
        loadData(); //Calling the loadData funciton
        
    },[])

    //Calculating the totoal amount for the 'Cart' page.
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    //Fetch food data using API
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
        //console.log(response.data.data);
        
    }



    // useEffect(() => {
    //     console.log(cartItems);
        
    // },[cartItems])

    //Passing the states, functions, so that they can be used in components. 
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider