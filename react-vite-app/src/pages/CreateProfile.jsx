import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { useNavigate } from "react-router-dom";
import { doCreateUserProfile, doFetchUserProfile } from "../firebase/firestore";
import CustomInput from "../components/auth/customInput.jsx";
import CardsButton from "../components/cardsPages/cardsButton.jsx";
import { ArrowLeft } from "lucide-react";
import GoogleAutocompleteInput from "../components/location/googleAutocompleteInput.jsx";
import { src as googleMapsAPISrc } from "../firebase/googleMapsAPIKey";


import Step1 from "../components/createProfile/Step1.jsx";
import Step2 from "../components/createProfile/Step2.jsx";
import Step3 from "../components/createProfile/Step3.jsx";
const useLoadScript = (src) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      if (
        existingScript.readyState === "complete" ||
        existingScript.hasAttribute("data-loaded")
      ) {
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
      if (event.key === "Enter") {
        event.preventDefault();
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
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
        location,
        age
      );
      navigate("/home");
    } catch (error) {
      console.error("Profile Creation failed:", error);
      alert("Failed to create profile: " + error.message);
    }
  };
  // console.log("isScriptLoaded: ", isScriptLoaded);

  if (!isScriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-bold-blue to-[#c0e8f7]">
      <form
        onSubmit={onSubmit}
        className={
          "min-w-fit p-6 bg-white shadow rounded-lg flex flex-col gap-5 md:rounded-3xl max-md:h-[514px] max-sm:w-3/4"
          // (step == 1 ? " " : " xl:w-1/3")
        }
      >
        <div className="flex justify-between">
          {step > 1 && (
            <button onClick={handleBack} className="flex items-center">
              <ArrowLeft />
            </button>
          )}
          <span className="text-sm font-semibold text-end w-full">{`${step} of 3`}</span>
        </div>
        <h2 className="text-xl font-bold self-center md:text-4xl mt-5">PROFILE SET UP</h2>

        {step === 1 && (
          <Step1 onClick={(role) => {
            setUserRole(role);
            handleNext();
          }} />
        )}

        {step === 2 && (
          <Step2 
            firstName={firstName}
            lastName={lastName}
            grade={grade}
            setGrade={setGrade}
            setFirstName={setFirstName}
            setLastName={setLastName}
            handleNext={handleNext}
          />
        )}

        {step === 3 && (
          <Step3
            location={location}
            setLocation={setLocation}
          />
        )}
      </form>
    </div>
  );
};

export default CreateProfilePage;
