import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLoginCross }) => {
  const [currentState, setCurrentState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);

  // Function to handle login/registration form submission
  const onLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (Reload of the page)
    let newURL = url;
    if (currentState === "Login") {
      newURL += "/api/user/login";
    } else {
      newURL += "/api/user/register";
    }
    // Send POST request to the constructed URL with form data
    const response = await axios.post(newURL, data);

    if (response.data.success) {
      setToken(response.data.message.token);
      //'localStorage' is a built-in JavaScript object that allows you to store key-value pairs in the browser's local storage. AND 'setItem' is a method of the localStorage object that allows you to store a key-value pair in the browser's local storage.
      localStorage.setItem("token", response.data.message.token);
      window.location.reload(); // Add this line to reload the page
      // Hide login cross and display success toast notification
      setShowLoginCross(false);
      toast.success(response.data.message.message);
    } else {
      alert(response.data.message);
      toast.error(response.data.message);
    }
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLoginCross(false)}
            src={assets.cross_icon}
            alt="cross-icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? ( <></> ) : ( <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your name" required  /> )}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuning, I agree to the terms of use & privacy.</p>
        </div>
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
