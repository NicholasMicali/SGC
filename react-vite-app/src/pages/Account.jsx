import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { doSignOut } from "../firebase/auth.js";
import { Navigate } from "react-router-dom";
import LeftSidebar from "../components/home/leftSideBar";
import RightSidebar from "../components/home/rightSideBar";
import Line from "../../src/assets/AcctSettingsLine.svg";
import { doFetchUserProfile, doUpdateUserProfile, doDeleteUserProfile } from "../firebase/firestore.js";
import { doPasswordReset, doDeleteUser } from "../firebase/auth.js";


// TO DO: 
//       - use the userProfile data to initialze the value of the form. 
//       - make each input handle change -> update the state variables with set fucntion . 
//       - make one submit button instead of multiple, have it call doUpdate userProfile with all the data. (look at other forms in the codebase for reference)
//       - use onDelete for delete profile button (add a confirmation button that pops up before it actually calls 'delete')
//       - (Profile pic doesn't exist in the database yet so don't use it in the onSubmit function, I'll fix it later)
//       - make password button into reset password button (use onReset), when clicked render "Email Sent!" instead of the reset button;

const AccountPage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth <= 768);
  const [userProfile, setUserProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // not stored in db yet
  const [firstName, setFirstName] = useState('');
  // const [lastName].... Add the rest of the form values.

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(currentUser.uid);
        setUserProfile(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [currentUser.uid]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doUpdateUserProfile(
        currentUser.uid, //dont change
        email,
        userProfile.userType, //dont change
        firstName, 
        lastName,
        location
      );
      setIsProfileCreated(true);
    } catch (error) {
      console.error("Profile Creation failed:", error);
      alert("Failed to create profile: " + error.message);
    }
  };

  const onDelete = async(e) => {
    e.preventDefault();
    try {
      await doDeleteProfile(currentUser.uid);
      await doDeleteUser();
    } catch (error) {
      console.error("Profile Delete failed:", error);
      alert("Failed to delete profile: " + error.message);
    }
  };

  const onReset = async(e) => {
    e.preventDefault();
    try {
      await doPasswordReset(currentUser.email);
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Failed to reset password: " + error.message);
    }
  };
  
  const handleFileChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
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
    marginBottom: "30px",
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


  /* Kylie old profile styles:
    <div style={containerStyle}>
          <div style={profilePictureContainerStyle}>
            <div style={profilePicturePlaceholderStyle} />
            <div style={profilePictureLabelStyle}>Profile Picture</div>
            <img src={Line} style={lineSeparatorStyle} alt="Line" />
            <button style={smallBlueButton}>Upload Image</button>
            <button style={smallRedButton}>Remove</button>
          </div>
  */

  return (
    <div className="flex h-screen">
      {!isNarrowScreen && (
        <LeftSidebar user={currentUser} signOut={signOut} page="Account Settings" />
      )}
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        <div style={containerStyle}>
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile Picture"
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-center">
              Default
            </div>
          )}
          <input
            type="file"
            id="profile-pic"
            onChange={handleFileChange}
            accept="image/*"
            className="mb-8"
          />
          <img src={Line} style={lineSeparatorStyle} alt="Line" />
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
            </div>
            <div style={buttonRowStyle}>
              <div style={{ flex: 1 }}>
                <label style={inputLabelStyle}>Location</label>
                <input type="text" style={inputFieldStyle} />
              </div>
            </div>
          </div>
          <button style={blueButton}>Reset Password</button>
          <button style={redButton}>Delete Account</button>
        </div>
      </div>
      {isNarrowScreen && (
        <LeftSidebar user={currentUser} signOut={signOut} page="Account Settings" />
      )}
    </div>
  );
};

export default AccountPage;
