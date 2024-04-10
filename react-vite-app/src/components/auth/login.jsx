import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth.js";
import CustomInput from "./customInput.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      //setIsSigningIn(true);
      try {
        const user = await doSignInWithEmailAndPassword(email, password);
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

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
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
      <small>
        By creating an account, you agree to the Terms of Service and Privacy
        Policy
      </small>
      <button
        type="submit"
        disabled={isSigningIn}
        className="  bg-gradient-to-tr rounded-xl p-2 text-white from-gradient-start via-gradient-mid to-gradient-end"
      >
        Log In
      </button>
    </form>
  );
};
export default Login;
