import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { Navigate } from "react-router-dom";
import Line from "../../src/assets/AcctSettingsLine.svg";
import { doFetchUserProfile, doUpdateUserProfile, doDeleteUserProfile } from "../firebase/firestore.js";
import { doPasswordReset, doDeleteUser } from "../firebase/auth.js";
import { doUploadFile } from "../firebase/storage.js"
import { useNavigate } from 'react-router-dom';
import { Pencil } from "lucide-react";

const AccountPage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth <= 820);
  const [userProfile, setUserProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // not stored in db yet
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [toggleEdit, setToggleEdit] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(currentUser.uid);
        const userData = profile.data();
        setUserProfile(userData); 
        setFirstName(userData.firstName || ''); 
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setLocation(userData.location || '');
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
  
    if (currentUser && currentUser.uid) {
      fetchUserProfile();
    }
  }, [currentUser]);

  useEffect(() => {
    const upload = async () => {
      if (file){
        try {
          const url = await doUploadFile(file);
          console.log(url);
          setImage(url);
        } catch (error) {
          console.log("Failed to upload image: " + error);
          alert("Failed to upload image: " + error.message);
        }
      }
    }
    upload();

    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth <= 820);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [file]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doUpdateUserProfile(
        currentUser.uid,
        email,
        userProfile.userType,
        firstName, 
        lastName,
        location,
        image,
      );
      setProfileUpdated(true);
      alert("Profile updated successfully!");
      window.location.reload(); 
    } catch (error) {
      console.error("Profile Creation failed:", error);
      alert("Failed to create profile: " + error.message);
    }
  };

  // confirmation message to delete acct 
  const confirmDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      await onDelete();
    }
  };
    
  const onDelete = async () => {
    try {
      await doDeleteUserProfile(currentUser.uid);
      await doDeleteUser(); 
      alert("Profile deleted.");
      navigate('/');
    } catch (error) {
      console.error("Profile Delete failed:", error);
      alert("Failed to delete profile: " + error.message);
    }
  };
  
  const onReset = async(e) => {
    e.preventDefault();
    try {
      await doPasswordReset(currentUser.email);
      setResetEmailSent(true);
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
  */

  return (
    // <div className="flex h-screen">
    //   {!isNarrowScreen && (
    //     <LeftSidebar user={currentUser} signOut={signOut} page="Account Settings" />
    //   )}
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        <div className="font-bold text-[4rem] my-10">Account</div>
        <button onClick={() => setToggleEdit(!toggleEdit)} className={"self-start flex flex-row underline" + (isNarrowScreen ? ' ml-10' : ' ml-20')}>Edit Profile<Pencil className="w-3 ml-2"></Pencil></button>
        <div style={containerStyle}>
          {file ?
            <img className="w-20 h-20 rounded-full mb-6"
              src={URL.createObjectURL(file)}
              alt=""
            />
          :
            <img className="w-20 h-20 rounded-full mb-6"
              src={
                userProfile?.image
                  ? userProfile.image
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          }
          {toggleEdit &&
            <input
              type="file"
              id="file"
              onChange={(e) => { setFile(e.target.files[0]) }}
              className="mb-4"
            />
          }
          <img src={Line} style={lineSeparatorStyle} alt="Line" />
          <div style={inputFieldContainerStyle}>
            <div style={inputRowStyle}>
              <div style={inputFieldPairStyle}>
                <label style={inputLabelStyle}>First Name</label>
                {toggleEdit ?
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={inputFieldStyle}
                  />
                :
                  <div className="text-2xl">{firstName}</div>
                }
              </div>
              <div style={inputFieldPairStyle}>
                <label style={inputLabelStyle}>Last Name</label>
                {toggleEdit ?
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={inputFieldStyle}
                  />
                :
                  <div className="text-2xl">{lastName}</div>
                }
              </div>
            </div>
            <div style={buttonRowStyle}>
              <div style={{ flex: 1 }}>
                <label style={inputLabelStyle}>Email Address</label>
                {toggleEdit ?
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputFieldStyle}
                  />
                :
                  <div className="text-2xl">{email}</div>
                }
              </div>
            </div>
            <div style={buttonRowStyle}>
              <div style={{ flex: 1 }}>
                <label style={inputLabelStyle}>Location</label>
                {toggleEdit ?
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={inputFieldStyle}
                  />
                :
                  <div className="text-2xl">{location}</div>
                }
              </div>
            </div>
          </div>
          {toggleEdit &&
            <button style={greenButton} onClick={onSubmit}>Update Profile</button>
          }
          <button style={blueButton} onClick={onReset} disabled={resetEmailSent}>
            {resetEmailSent ? "Email Sent!" : "Reset Password"}
            </button>
          <button style={redButton} onClick={confirmDelete}>Delete Account</button>
        </div>
      </div>
    //   {isNarrowScreen && (
    //       <SmallMenuSidebar 
    //         user={currentUser} 
    //         signOut={signOut} 
    //         page="Account Settings" />
    //   )}
    // </div>
  );
};

export default AccountPage;
