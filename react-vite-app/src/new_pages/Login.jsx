import React, { useState } from "react";
import Megaphone from "./Megaphone";
import Button from "../new componenets/Button";
import Input from "../new componenets/Input";
import logo from "/SGC_LOGO.svg"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center">
       
       <Megaphone className="hidden md:block mr-auto ml-auto" />
        
      <div className="flex flex-col items-center justify-center h-screen w-full gap-5 p-10 md:w-1/2">
        <Megaphone className="md:hidden" />

        <img src={logo} alt="logo" className="w-full mb-10 max-md:hidden" />
        <h2 className="text-3xl font-bold ">Login</h2>

        <Input
          placeholder="Email"
          className="border-bold-pink rounded-md border-[2px] placeholder:text-bold-pink placeholder:font-semibold focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Password"
          className="border-bold-pink rounded-md border-[2px] placeholder:text-bold-pink placeholder:font-semibold focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <Button
          buttonText="Continue"
          className=" p-2 rounded-full text-white text-lg font-semibold bg-bold-pink "
        />
        <hr className="w-3/4 border-[1px] border-black mt-5" />
        <span className="text-lg font-bold">or</span>
        <Button
          buttonText="Sign Up"
          className=" p-2 rounded-full text-white text-lg font-semibold bg-bold-blue"
        />
      </div>
    </div>
  );
};

export default Login;
