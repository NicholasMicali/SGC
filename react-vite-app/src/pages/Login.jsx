import React, { useState } from "react";
import Login from "../components/auth/login";
import SignUp from "../components/auth/signup";
import GoogleIcon from "../assets/google_icon.svg";
import GoogleButton from "../components/auth/googleButton.jsx";
import ToggleButton from "../components/auth/toggleButton.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/index";
import { doSignInWithGoogle } from "../firebase/auth.js";
import Logo from "../assets/logo.svg";
import { ArrowLeft, Check } from "lucide-react";
import AuthSplash from "../assets/AuthSplash.jpg";
import { animateTopDownOnTrigger } from "../constants/anim.js";
import { motion } from "framer-motion";
const LoginPage = () => {
  const { userLoggedIn } = useAuth();
  const [current, setCurrent] = useState("Log In");
  const [errMessage, setErrMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithGoogle();
      // Handle user if needed, for now you can ignore it
      setIsSigningIn(true);
    } catch (err) {
      //the follow 2 error msgs comes up when the user closes the popup
      // Firebase: Error (auth/cancelled-popup-request).
      // Firebase: Error (auth/popup-closed-by-user).
      if (
        err.message !== "Firebase: Error (auth/cancelled-popup-request)." &&
        err.message !== "Firebase: Error (auth/popup-closed-by-user)."
      ) {
        {
          setErrMessage(err.message);
        }
      }
    }
  };

  const handleToggle = () => {
    setCurrent("Log In" === current ? "Sign Up" : "Log In");
  };

  const handleGoBack = () => {
    console.log("Go back");
  };

  //      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
  if (isSigningIn) {
    return <Navigate to={"/create-profile"} replace={true} />;
  }

  return (
    <div className="flex max-w-full max-h-screen relative">
      {
        <motion.div
          {...animateTopDownOnTrigger(errMessage)}
          role="alert"
          className="alert absolute min-w-fit max-w-[500px] mt-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{errMessage}</span>
          <Check size={20} onClick={() => {setErrMessage("")}} className=" cursor-pointer"/>
        </motion.div>
      }
      <div className=" xl:block hidden min-w-[50%] max-h-screen p-0">
        <img
          src={AuthSplash}
          alt="Spread Goodness splash"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className=" h-screen flex flex-col justify-between items-center w-full bg-[#fefcfa] p-4 md:p-24">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handleGoBack}
            className="text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <ArrowLeft /> Go Back
            </div>
          </button>
          <p className="sm:block hidden">
            {current === "Log In" ? "You don't" : "Already"} have an account?
            &nbsp;
            <span className="underline cursor-pointer" onClick={handleToggle}>
              {current === "Log In" ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} alt="Spread Goodness logo" />
          <h1 className=" text-5xl font-bold md:text-6xl">{current}</h1>
        </div>
        <div className="flex justify-between items-center w-full md:hidden">
          <ToggleButton
            color={current === "Sign Up" ? "#fe87b7" : "#feb3d1"}
            borderColor={current === "Sign Up" ? "#fd4f96" : null}
            text="Sign Up"
            onClick={handleToggle}
            current={current}
          />
          <ToggleButton
            color={current === "Log In" ? "#8dd3ef" : "#d1edf9"}
            borderColor={current === "Log In" ? "#48b8e6" : null}
            text="Log In"
            onClick={handleToggle}
            current={current}
          />
        </div>
        <div className="md:w-[60%] w-full">
          {current === "Log In" ? (
            <>
              <GoogleButton
                text="Login with Google"
                onClick={onGoogleSignIn}
                icon={GoogleIcon}
              />
              <div className="w-full flex items-center">
                <hr className="w-full border-black md:border-[1.5px]" />
                <div className="text-gray-500 ml-5 mr-5">OR</div>
                <hr className="w-full border-black md:border-[1.5px]" />
              </div>
              <Login setErrMsg={setErrMessage} />
            </>
          ) : (
            <SignUp />
          )}
        </div>
        {/*this following div is needed for the spacing to look right on the auth pages*/}
        <div></div>
      </div>
    </div>
  );
};

export default LoginPage;
