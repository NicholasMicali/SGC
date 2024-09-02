import React, { useState, useEffect } from "react";
import Megaphone from "../new componenets/Megaphone";
import Button from "../new componenets/Button";
import Input from "../new componenets/Input";
import logo from "/SGC_LOGO.svg";
import { motion, AnimatePresence } from "framer-motion";
import BloomingHeart from "../new componenets/BloomingHeart";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../firebase/auth";
import GoogleButton from "../components/auth/googleButton";
import GoogleIcon from "../assets/google_icon.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showBloomingHeart, setShowBloomingHeart] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLoginSubmit = async () => {
    setIsSigningIn(true);
    if (isLogin) {
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/home");
      } catch (error) {
        console.log("Error signing in: " + error);
      }
    } else {
      console.log("signup");
    }
    setIsSigningIn(false);
  };

  const handleSignupSubmit = async () => {
    setIsSigningIn(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/create-profile");
    } catch (error) {
      console.log("Error signing up: " + error);
    }
    setIsSigningIn(false);
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
      navigate("/create-profile");
    } catch (error) {
      console.log("Error signing in with Google: " + error);
    }
    setIsSigningIn(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBloomingHeart(false);
    }, 1500); // Adjust this timing as needed

    return () => clearTimeout(timer);
  }, []);

  const input_style = isLogin
    ? "border-bold-pink placeholder:text-bold-pink"
    : "border-bold-blue placeholder:text-bold-blue";

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence>
        {showBloomingHeart && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <BloomingHeart />
          </motion.div>
        )}
      </AnimatePresence>

      <Megaphone className="hidden md:block mr-auto ml-auto" />

      <div className="flex flex-col items-center justify-center h-screen w-full gap-5 p-10 md:w-1/2">
        <Megaphone className="md:hidden" />

        <motion.img
          src={logo}
          alt="logo"
          className="w-full mb-10 max-md:hidden"
          layoutId="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBloomingHeart ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="text-3xl font-bold ">{isLogin ? "LOGIN" : "SIGN UP"}</h2>
        <GoogleButton
          onClick={handleGoogleSignIn}
          icon={GoogleIcon}
          text="Sign in with Google"
          disabled={isSigningIn}
        />
        <Input
          placeholder="Email"
          className={`rounded-md border-[2px]  placeholder:font-semibold focus:outline-none ${input_style}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Password"
          className={`rounded-md border-[2px]  placeholder:font-semibold focus:outline-none ${input_style}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <Button
          buttonText="Continue"
          className={`p-2 rounded-full text-white text-lg font-semibold ${
            isLogin
              ? "bg-bold-pink hover:bg-pink-500"
              : "bg-bold-blue hover:bg-bold-blue-hover"
          }`}
          onClick={isLogin ? handleLoginSubmit : handleSignupSubmit}
          disabled={isSigningIn}
        />
        <hr className="w-3/4 border-[1px] border-black mt-5" />
        <span className="text-lg font-bold">or</span>
        <Button
          buttonText={isLogin ? "Sign Up" : "Login"}
          className={`p-2 rounded-full text-white text-lg font-semibold ${
            isLogin
              ? "bg-bold-blue hover:bg-bold-blue-hover"
              : "bg-bold-pink hover:bg-pink-500"
          }`}
          disabled={isSigningIn}
          onClick={() => setIsLogin(!isLogin)}
        />
      </div>
    </div>
  );
};

export default Login;
