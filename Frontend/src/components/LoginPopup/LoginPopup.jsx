import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    // fetch url using context API:
    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    // onChangeHandler - that will take data from input field and save it in state variable:
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // set the above values in state variable:
        setData(data => ({...data, [name]:value}));
    }

    // onLogin function:
    const onLogin = async (event) => {
        event.preventDefault();
        // instance of url:
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        // call the API: This API work both in login and register
        const response = await axios.post(newUrl, data);
        // after API calling we'll get the response - if get the response as success we'll get a token and we'll save the token using state variable:
        if (response.data.success) {
            setToken(response.data.token);
            // save the token in local storage:
            localStorage.setItem("token", response.data.token);
            // after login we need to hide the login page so:
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }

    }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false) } src={assets.cross_icon} alt="" />
            </div>

            {/* Login Popup Inputs */}
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>

            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            
            {currState==="Login"
            ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here!</span></p>
            : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here!</span></p>  
            }



        </form>
    </div>
  )
}

export default LoginPopup