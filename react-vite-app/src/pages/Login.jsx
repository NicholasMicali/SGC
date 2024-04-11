import React, { useState } from "react";
import Login from "../components/auth/login";
import SignUp from "../components/auth/signup";
import GoogleIcon from "../assets/google_icon.svg";
import GoogleButton from "../components/auth/googleButton.jsx";
import LoginSignupButton from "../components/auth/loginSignupButton.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/index";
import { doSignInWithGoogle } from "../firebase/auth.js";
import Logo from "../assets/logo.svg"


const LoginPage = () => {
  const { userLoggedIn } = useAuth();
  const [current, setCurrent] = useState("Log In");
  const [errMessage, setErrMessage] = useState("");

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      const user = doSignInWithGoogle().catch(err => {
        setErrMessage(err);
        console.error('Login with google failed:', err);
        alert('Failed to login with google:', err.message);
      })
      setIsSigningIn(true);
    }
  }

  const handleToggle = () => {
    setCurrent("Log In" === current ? "Sign Up" : "Log In");
  };

  return (
    <div className=" h-screen flex flex-col justify-evenly items-center">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div>
        <img src={Logo} alt="Spread Goodness logo" />
        <h1 className=" text-5xl font-bold">{current}</h1>
      </div>
      <div className="flex justify-between items-center w-full">
        <LoginSignupButton
          color={current === "Sign Up" ? "#fe87b7" : "#feb3d1"}
          borderColor={current === "Sign Up" ? "#fd4f96" : null}
          text="Sign Up"
          onClick={handleToggle}
          current={current}
        />
        <LoginSignupButton
          color={current === "Log In" ? "#8dd3ef" : "#d1edf9"}
          borderColor={current === "Log In" ? "#48b8e6" : null}
          text="Log In"
          onClick={handleToggle}
          current={current}
        />
      </div>

      <GoogleButton
        text="Sign Up With Google"
        onClick={onGoogleSignIn}
        icon={GoogleIcon}
      />
      <div className="w-full flex items-center">
        <hr className="w-full border-black" />
        <div className="text-gray-500 ml-5 mr-5">OR</div>
        <hr className="w-full border-black" />
      </div>
      {current === "Log In" ? <Login /> : <SignUp />}
      <div>{errMessage ? errMessage : ""}</div>
    </div>
  );
};

export default LoginPage;
