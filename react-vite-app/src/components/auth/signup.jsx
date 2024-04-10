import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import CustomInput from "./customInput.jsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        // Handle errors here, such as displaying a message to the user
        console.error("Sign up failed:", error);
        alert("Failed to sign up: " + error.message);
        return;
      }
      setIsSigningUp(true);
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
        disabled={isSigningUp}
        className="  bg-gradient-to-tr rounded-xl p-2 text-white from-gradient-start via-gradient-mid to-gradient-end"
      >
        Sign Up
      </button>
    </form>
  );
};
export default SignUp;
