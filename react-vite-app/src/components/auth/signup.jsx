import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import CustomInput from "./customInput.jsx";
import {motion} from "framer-motion";
import AuthButton from "./authButton.jsx";
import { useAuth } from "../../auth/index";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = ({setErrMsg}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
      setIsLoading(true);
      try {
        if (currentUser) {
          await doSignOut();
        }
        await doCreateUserWithEmailAndPassword(email, password);
        setIsLoading(false);
        navigate("/create-profile");
      } catch (error) {
        // Handle errors here, such as displaying a message to the user
        setErrMsg(error.message);
        return;
      }
      setIsLoading(false);
  };

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
      <AuthButton text="Sign Up" disabled={isLoading}/>
    </form>
  );
};
export default SignUp;
