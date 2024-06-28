import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import CustomInput from "./customInput.jsx";
import { Navigate } from "react-router-dom";
import {motion} from "framer-motion";
import AuthButton from "./authButton.jsx";
import { useAuth } from "../../auth/index";
import { doSignOut } from "../../firebase/auth";


const SignUp = ({setErrMsg}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { currentUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        if (currentUser) {
          await doSignOut();
        }
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        // Handle errors here, such as displaying a message to the user
        setErrMsg(error.message);
        return;
      }
      setIsSigningUp(true);
    }
  };

  if (isSigningUp) {
    return <Navigate to={"/create-profile"} replace={true} />
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col items-center gap-5">
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
      <small className=" md:text-lg text-center text-[#64748b] md:w-[110%] md:mt-3">
        By creating an account, you agree to the Terms of Service and Privacy
        Policy
      </small>
      <AuthButton text="Sign Up" disabled={isSigningUp}/>
    </form>
  );
};
export default SignUp;
