import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    // backend URL:
    const url = "http://localhost:4000";

    const [token, setToken] = useState({});

    // fetch Food data on frontend from database:
    const [food_list, setFoodList] = useState([]);

    // Add to the cart functionality:
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }

        if (token) {
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}});
        }
    }

    // Remove from the cart functionality:
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}));
        if (token) {
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
        }
    }

    // Function to get the Total Cart Amount:
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }

        }

        return totalAmount;
    }


    // Fetching Food Data on Frontend from Database:
    const fetchFoodList = async () => {
        // we are using get() because we have create FoodList API using get()
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    } // whenever the webpage is loaded then, we need to run the fetchFoodList() 


    // if the page got reloaded then still the added item should be same not change to reseted one.So this can be done:
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    
    useEffect(() => {

        async function loadData() {
            await fetchFoodList();

            // used to avoid user to logout directly after reloading:
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }

        loadData();
    }, [])



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
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;