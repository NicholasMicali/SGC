import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { useNavigate } from "react-router-dom";
import { doCreateUserProfile, doFetchUserProfile } from "../firebase/firestore";
import CustomInput from "../components/auth/customInput.jsx";
import CustomSelect from "../components/auth/customSelect.jsx";
import CardsButton from "../components/cardsPages/cardsButton.jsx";
import { ArrowLeft } from "lucide-react";
import GoogleAutocompleteInput from "../components/location/googleAutocompleteInput.jsx";
import { src as googleMapsAPISrc } from "../firebase/googleMapsAPIKey";

const useLoadScript = (src) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    
    if (existingScript) {
      if (existingScript.readyState === 'complete' || existingScript.hasAttribute("data-loaded")) {
        setLoaded(true);
      } else {
        // If the script is present but not loaded, attach onload handler
        existingScript.onload = () => {
          setLoaded(true);
          existingScript.setAttribute("data-loaded", "true");
        };
      }
    } else {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setLoaded(true);
        script.setAttribute("data-loaded", "true");
      };
      document.head.appendChild(script);
    }
  }, [src]);

  return loaded;
};

const CreateProfilePage = () => {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const isScriptLoaded = useLoadScript(googleMapsAPISrc);


  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const profile = await doFetchUserProfile(currentUser.uid);
          if (profile.data() !== undefined) {
            navigate("/home");
          }
        } catch (error) {
          console.error("First Time User: " + error);
        }
     }
    };

    fetchUserProfile();
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  }

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
        location,
        grade
      );
      navigate("/home");
    } catch (error) {
      console.error("Profile Creation failed:", error);
      alert("Failed to create profile: " + error.message);
    }
  };
  console.log("isScriptLoaded: ", isScriptLoaded)

  if (!isScriptLoaded) {
    return <div>Loading...</div>;
  }

  const gradeOptions = [
    { value: "K", label: "Kindergarten" },
    { value: "1", label: "1st Grade" },
    { value: "2", label: "2nd Grade" },
    { value: "3", label: "3rd Grade" },
    { value: "4", label: "4th Grade" },
    { value: "5", label: "5th Grade" },
    { value: "6", label: "6th Grade" },
    { value: "7", label: "7th Grade" },
    { value: "8", label: "8th Grade" },
    { value: "9", label: "9th Grade" },
    { value: "10", label: "10th Grade" },
    { value: "11", label: "11th Grade" },
    { value: "12", label: "12th Grade" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-500 to-pink-500">
      <form
        onSubmit={onSubmit}
        className={"w-3/4 lg:w-1/2 max-sm:min-w-[320px] p-5 bg-white shadow rounded-lg flex flex-col gap-5" + ((step == 1) ? " xl:w-1/2" : " xl:w-1/3")}
      >
        <div className="flex justify-between">
          {(step > 1) &&
            <button onClick={handleBack} className="flex items-center">
              <ArrowLeft /> Go Back
            </button>
          }
          <span className="text-sm font-semibold">{`Step ${step} of 3`}</span>
        </div>
        <h2 className="text-xl font-bold self-center">Profile Setup</h2>

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
                staticStyle={true}
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
                staticStyle={true}
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
                staticStyle={true}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-4">
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
            <CustomSelect
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              labelName="If you are a student, enter your grade"
              options={gradeOptions}
            />
            <div className="flex justify-center w-full mt-6">
              <CardsButton
                text="Next"
                borderColor="#BEDF3D"
                textColor="#8DAB1C"
                backgroundColor="#EAF4C0"
                onClick={handleNext}
                staticStyle={true}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Please Provide a Location</h3>
            <GoogleAutocompleteInput
              value={location}
              onChange={setLocation}
              placeholder="Enter your city"
            />
            <div className="flex justify-center w-full mt-6">
              <CardsButton
                type="submit"
                text="Submit"
                borderColor="#FD3B8A"
                textColor="#FC086B"
                backgroundColor="#FFD3E5"
                staticStyle={true}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfilePage;
