import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth.js";
import CustomInput from "./customInput.jsx";
import { Navigate } from "react-router-dom";
import AuthButton from "./authButton.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      //setIsSigningIn(true);
      try {
        console.log("Attempting to sign in");
        const user = await doSignInWithEmailAndPassword(email, password);
        console.log("User signed in: " + user);
      } catch (error) {
        // Handle errors here, such as displaying a message to the user
        console.error("Login failed:", error);
        alert("Failed to log in: " + error.message);
        return;
      }
      setIsSigningIn(true);
      //console.log("User signed in: " + user);
    }
  };

  if (isSigningIn) {
    return <Navigate to={"/home"} replace={true} />
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
      <CustomInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        labelName="Email"
      />
      <CustomInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        labelName="Password"
      />
      <AuthButton text="Log In" disabled={isSigningIn}/>
    </form>
  );
};
export default Login;
