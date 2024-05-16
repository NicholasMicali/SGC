import React, { useState } from "react";
import { useAuth } from "../auth/index";
import { doSignOut } from "../firebase/auth.js";
import { Navigate } from "react-router-dom";
import LeftSidebar from "../components/home/leftSideBar";
import RightSidebar from "../components/home/rightSideBar";
import Line from "../../src/assets/AcctSettingsLine.svg";

const AccountPage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
    } catch (error) {
      console.error("Log out failed:", error);
      alert("Failed to log out: " + error.message);
      return;
    }
    setIsSigningOut(true);
  };

  if (isSigningOut) {
    return <Navigate to={"/"} replace={true} />;
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    maxWidth: "954px",
    margin: "auto",
  };

  const profilePictureContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  };

  const profilePicturePlaceholderStyle = {
    backgroundColor: "#d9d9d9",
    borderRadius: "41.5px",
    height: "83px",
    width: "83px",
    marginBottom: "10px",
  };

  const profilePictureLabelStyle = {
    fontSize: "16px",
    color: "#000000",
    marginBottom: "10px",
  };

  const lineSeparatorStyle = {
    height: "10px",
    width: "100%",
    marginBottom: "20px",
  };

  const inputFieldContainerStyle = {
    width: "100%",
    marginBottom: "20px",
  };

  const inputFieldPairStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  const inputLabelStyle = {
    fontSize: "16px",
    color: "#000000",
    marginBottom: "5px",
  };

  const inputFieldStyle = {
    width: "100%",
    padding: "10px",
    border: "2px solid #f2dd69",
    borderRadius: "12px",
    marginBottom: "10px",
  };

  const smallBlueButton = {
    backgroundColor: "#d1edf9",
    border: "2px solid #48b8e6",
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#48b8e6",
    margin: "5px 0",
    cursor: "pointer",
  };

  const smallRedButton = {
    backgroundColor: "#ffd3e5",
    border: "2px solid #fd3b8a",
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#fd3b8a",
    margin: "5px 0",
    cursor: "pointer",
  };

  const blueButton = {
    backgroundColor: "#d1edf9",
    border: "2px solid #48b8e6",
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#48b8e6",
    margin: "5px 0",
    cursor: "pointer",
    width: "150px", // Adjusted width
  };

  const greenButton = {
    backgroundColor: "#EAF4C0",
    border: "2px solid #BEDF3D",
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#8DAB1C",
    margin: "5px 0",
    cursor: "pointer",
    width: "150px", // Adjusted width
  };

  const redButton = {
    backgroundColor: "#ffd3e5",
    border: "2px solid #fd3b8a",
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#fd3b8a",
    margin: "5px 0",
    cursor: "pointer",
    width: "150px", // Adjusted width
  };

  const inputRowStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  };

  const buttonRowStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "20px",
  };

  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut} page="Account Settings" />
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        <div style={containerStyle}>
          <div style={profilePictureContainerStyle}>
            <div style={profilePicturePlaceholderStyle} />
            <div style={profilePictureLabelStyle}>Profile Picture</div>
            <img src={Line} style={lineSeparatorStyle} alt="Line" />
            <button style={smallBlueButton}>Upload Image</button>
            <button style={smallRedButton}>Remove</button>
          </div>
          <div style={inputFieldContainerStyle}>
            <div style={inputRowStyle}>
              <div style={inputFieldPairStyle}>
                <label style={inputLabelStyle}>First Name</label>
                <input type="text" style={inputFieldStyle} />
              </div>
              <div style={inputFieldPairStyle}>
                <label style={inputLabelStyle}>Last Name</label>
                <input type="text" style={inputFieldStyle} />
              </div>
            </div>
            <div style={buttonRowStyle}>
              <div style={{ flex: 1 }}>
                <label style={inputLabelStyle}>Email Address</label>
                <input type="email" style={inputFieldStyle} />
              </div>
              <button style={greenButton}>Change your Email Address</button>
            </div>
            <div style={buttonRowStyle}>
              <div style={{ flex: 1 }}>
                <label style={inputLabelStyle}>Location</label>
                <input type="text" style={inputFieldStyle} />
              </div>
              <button style={greenButton}>Change your Location</button>
            </div>
          </div>
          <button style={blueButton}>Change Password</button>
          <button style={redButton}>Delete Account</button>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default AccountPage;
