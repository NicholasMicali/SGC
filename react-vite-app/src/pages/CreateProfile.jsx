import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useAuth } from "../auth/index";
import { Navigate } from "react-router-dom";
import { doCreateUserProfile } from "../firebase/firestore";
import CustomInput from "../components/auth/customInput.jsx";
import CardsButton from "../components/cardsPages/cardsButton.jsx";
import { doFetchUserProfile } from "../firebase/firestore";

const CreateProfilePage = () => {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(null); // not stored
  const [location, setLocation] = useState("");
  const [isProfileCreated, setIsProfileCreated] = useState(false);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(currentUser.uid);
        if (profile.data() !== undefined) {
          console.log(profile.data())
          setIsProfileCreated(true);
        }
      } catch (error) {
        console.error("First Time User: " + error);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const locationOptions = [
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Chicago", label: "Chicago" },
    { value: "Houston", label: "Houston" },
    { value: "Phoenix", label: "Phoenix" },
    { value: "San Luis Obispo", label: "San Luis Obispo" },
    // Add more locations as needed
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleFileChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserProfile(
        currentUser.uid,
        currentUser.email,
        userRole,
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

  if (isProfileCreated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-500 to-pink-500">
      <form
        onSubmit={onSubmit}
        className="w-3/4 lg:w-1/2 xl:w-1/3 max-sm:min-w-[600px] p-5 bg-white shadow rounded-lg flex flex-col gap-5"
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Profile Setup</h2>
          <span className="text-sm font-semibold">{`Step ${step} of 3`}</span>
        </div>

        {step === 1 && (
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Who are you?</h3>
            <div className="flex max-sm:flex-col justify-center gap-4">
              <CardsButton
                text="Teacher"
                backgroundColor="#D1EDF9"
                textColor="#1D9FD5"
                borderColor="#48B8E6"
                onClick={() => {
                  setUserRole("Teacher");
                  handleNext();
                }}
              />
              <CardsButton
                text="Student"
                backgroundColor="#EAF4C0"
                textColor="#8DAB1C"
                borderColor="#BEDF3D"
                onClick={() => {
                  setUserRole("Student");
                  handleNext();
                }}
              />
              <CardsButton
                text="Visitor"
                backgroundColor="#FFD3E5"
                textColor="#FC086B"
                borderColor="#FD3B8A"
                onClick={() => {
                  setUserRole("Visitor");
                  handleNext();
                }}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="profile-pic"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Picture"
                  className="w-20 h-20 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-center">
                  Click to Upload
                </div>
              )}
              <input
                type="file"
                id="profile-pic"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </label>
            <CustomInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              labelName="First Name"
            />
            <CustomInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              labelName="Last Name"
            />
            <div className="flex justify-center w-full mt-6">
              <CardsButton
                text="Next"
                borderColor="#BEDF3D"
                textColor="#8DAB1C"
                backgroundColor="#EAF4C0"
                onClick={handleNext}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Please Provide a Location</h3>
            <Select
              options={locationOptions}
              value={locationOptions.find(
                (option) => option.value === location
              )}
              onChange={(option) => setLocation(option.value)}
              className="w-full"
              isSearchable
            />
            <div className="flex justify-center w-full mt-6">
              <CardsButton
                type="submit"
                text="Submit"
                borderColor="#FD3B8A"
                textColor="#FC086B"
                backgroundColor="#FFD3E5"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfilePage;
