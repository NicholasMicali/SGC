import React from "react";
import { useNavigate } from "react-router-dom";
import Megaphone from "../new componenets/Megaphone";
import logo from "/SGC_LOGO.svg";
import Button from "../new componenets/Button";

const Landing = () => {
  const navigate = useNavigate();

  const handleJoinMovement = () => {
    navigate("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-6">
      <Megaphone className=""/>
      <img src={logo} alt="logo" className="w-3/4 mb-10 " />

      <Button
        buttonText="Join The Movement"
        className="max-sm:w-[90%] max-w-[359px] bg-bold-blue text-white p-2 py-4 rounded-full font-bold"
        onClick={handleJoinMovement}
      />
    </div>
  );
};

export default Landing;