import React, { useState } from "react";
import Megaphone from "./Megaphone";
import Button from "../new componenets/Button";
import Input from "../new componenets/Input";
import logo from "/SGC_LOGO.svg"
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if(isLogin){
      console.log("login")
    }else{
      console.log("signup")
    }
  }
  const input_style = isLogin ? "border-bold-pink placeholder:text-bold-pink" : "border-bold-blue placeholder:text-bold-blue";

  return (
    <div className="flex items-center justify-center">
       
       <Megaphone className="hidden md:block mr-auto ml-auto" />
        
      <div className="flex flex-col items-center justify-center h-screen w-full gap-5 p-10 md:w-1/2">
        <Megaphone className="md:hidden" />

        <img src={logo} alt="logo" className="w-full mb-10 max-md:hidden" />
        <h2 className="text-3xl font-bold ">{isLogin ? "LOGIN" : "SIGN UP"}</h2>

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
          className={`p-2 rounded-full text-white text-lg font-semibold ${isLogin ? "bg-bold-pink" : "bg-bold-blue"}`}
          onClick={handleSubmit}
        />
        <hr className="w-3/4 border-[1px] border-black mt-5" />
        <span className="text-lg font-bold">or</span>
        <Button
          buttonText={isLogin ? "Sign Up" : "Login"}
          className={`p-2 rounded-full text-white text-lg font-semibold ${isLogin ? "bg-bold-blue" : "bg-bold-pink"}`}
          onClick={() => setIsLogin(!isLogin)}
        />
      </div>
    </div>
  );
};

export default Login;
