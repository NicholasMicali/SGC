import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button";
import CustomInput from "../../components/auth/customInput";
import {
  doCreateCard,
  doCardToUserProfile,
  doFetchUserProfile,
  doCreatePost,
  doPostToCard,
  doFetchCard,
  doIncrementCard,
  doIncrementUserCards,
  doFetchCardByCode,
} from "../../firebase/firestore";
import { doUploadFile } from "../../firebase/storage.js";
import Stickers from "./Stickers.jsx";
import { ArrowLeft } from "lucide-react";
import GoogleAutocompleteInput from "../../components/location/googleAutocompleteInput.jsx";
import { animateQuickDownToUpWithDelay } from "../../constants/anim";
import { motion } from "framer-motion";
import { fetchLocation } from "../../components/location/fetchLocation.jsx";
import { src as googleMapsAPISrc } from "../../firebase/googleMapsAPIKey.js";


const useLoadScript = (src) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    
    if (existingScript) {
      if (existingScript.hasAttribute("data-loaded")) {
        setLoaded(true);
      } else {
        existingScript.onload = () => setLoaded(true);
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

const generateCode = () => {
  const digits = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomDigit = () => digits[Math.floor(Math.random() * digits.length)];
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  return `${randomDigit()}${randomDigit()}${randomLetter()}${randomLetter()}${randomLetter()}${randomDigit()}${randomDigit()}${randomDigit()}`;
};

// Generate 5 random card codes, check if any of them was unique, return the first one that is
const generateUniqueCode = async (attempts = 5) => {
  const codes = Array.from({ length: attempts }, generateCode);
  for (const code of codes) {
    const exists = await doFetchCardByCode(code);
    if (!exists) {
      return code;
    }
  }
  return generateUniqueCode(attempts); // Recur if no unique code was found
};

const headers = [
  "Tell us what you did to Spread Goodness!", "Title your Post!", "Would you like to edit your location?", "Accessorize your post!", "You're Amazing!"
];

const placeHolderText = "Where were you?\nWhose day did you brighten?\nHow did they feel?\nHow did it make you feel?";


const NewCard = ({ setNewPost, toNominate, user, select, setShowCongrats, setConfettiPieces }) => {
  const [step, setStep] = useState(0);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [createdCard, setCreatedCard] = useState(null);
  const [cid, setCid] = useState(null);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [stickers, setStickers] = useState([]);
  const [location, setLocation] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [toggleManual, setToggleManual] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [codeUnique, setCodeUnique] = useState(false);
  const [codeTouched, setCodeTouched] = useState(false);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
  ];
  const isScriptLoaded = useLoadScript(googleMapsAPISrc);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.uid]);

  useEffect(() => {
    const upload = async () => {
      if (file) {
        try {
          const url = await doUploadFile(file);
          console.log(url);
          setImage(url);
        } catch (error) {
          console.log("Failed to upload image: " + error);
          alert("Failed to upload image: " + error.message);
        }
      }
    };
    upload();
  }, [file]);

  useEffect(() => {
    const fetchLoc = async () => {
      console.log('Initial location:', userProfile?.location);
      let location = userProfile?.location;
      if (location == "") {
        console.log('Fetching location because it is null');
        location = await fetchLocation();
      }
  
      if (location) {
        // This is a temporary fix for when the fetch location does not work: (fix later)
        const postLocation = (location === "Error") ? '' : location;
        setLocation(postLocation);
        console.log('Location set to:', postLocation);
      } else {
        console.log('Failed to fetch location:', location);
        setLocation(userProfile?.location || '');
      }
    };
  
    if (userProfile) {
      fetchLoc();
    }
  }, [user?.uid, userProfile]);

  useEffect(() => {
    const setInitialCode = async () => {
      const uniqueCode = await generateUniqueCode();
      setCode(uniqueCode);
    };
    setInitialCode();
  }, []);


  const validateCodeFormat = (code) => {
    return /^\d{2}[A-Za-z]{3}\d{3}$/.test(code);
  };

  const checkCodeUniqueness = async (code) => {
    const already = await doFetchCardByCode(code);
    return !already;
  };

  const handleCodeChange = async (e) => {
    const newCode = e.target.value ? e.target.value.toLowerCase() : '';
    setCode(newCode);
    setCodeTouched(true);
  
    const isValidFormat = validateCodeFormat(newCode);
    setCodeValid(isValidFormat);
  
    if (isValidFormat) {
      const isUnique = await checkCodeUniqueness(newCode);
      setCodeUnique(isUnique);
    } else {
      setCodeUnique(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isCreatingCard) {
      if (!/^\d{2}[A-Za-z]{3}\d{3}$/.test(code)) {
        console.log("Invalid code format.");
        alert("Invalid Code Format");
        return;
      }
      const already = await doFetchCardByCode(code);
      if (already) {
        console.log("Code already in use");
        alert("Code already exists, try again");
        return;
      }
      setIsCreatingCard(true);
      try {
        const classrooms = userProfile.classrooms ? userProfile.classrooms : [];
        const card = await doCreateCard(
          user.uid,
          title,
          code,
          userProfile.email,
          classrooms
        );
        await doCardToUserProfile(user.uid, card.id);
        const userLocation = manualLocation ? manualLocation : location;
        const postLocation = userLocation ? userLocation : userProfile?.location;
        const date = new Date();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const postDate = month + " " + day;
        const post = await doCreatePost(card.id, user.uid, userProfile.firstName, text, postLocation, postDate, userProfile.userType, image, stickers);
        const distance = 0;
        await doPostToCard(card.id, post.id, postLocation, distance);
        const cardObj = await doFetchCard(card.id);
        setCid(card.id);
        setCreatedCard(cardObj.data());
        //console.log(card);
        if (userProfile?.classrooms) {
          const classPromises = userProfile.classrooms.map((classId) =>
            doIncrementCard(classId)
          );
          await Promise.all(classPromises);
        }
        await doIncrementUserCards(user.uid);

        // return post;
      } catch (error) {
        console.error("Create card failed:", error);
        alert("Failed to create card: " + error.message);
        return;
      }
    }
  };

  const selectSticker = (src) => {
    if (stickers.length < 3) {
      setStickers([...stickers, src]);
    }
  };

  if (isCreatingCard && createdCard) {
    setShowCongrats(true);
    setConfettiPieces(200);
    select(createdCard, cid)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg max-sm:w-[85%] w-[400px] h-[435px] p-4 relative flex flex-col justify-start border-4 border-bold-pink`}
      >
        <X className="absolute top-4 right-4 hover:cursor-pointer" onClick={setNewPost} />
        <form 
        onSubmit={onSubmit}
        className="flex flex-col w-full h-full overflow-auto">
          {step === 0 && (
            <>
              <div className="flex flex-col w-full">
                <div className="w-3/4 flex items-start justify-start">
                  <p className="text-2xl font-medium">{headers[0]}</p>
                </div>
                <textarea 
                  className={`rounded-lg shadow-lg max-sm:w-[85%] w-[301px] h-[176px] p-4 relative flex flex-col justify-between items-center text-sm
                  }`}
                  style={{ backgroundColor: '#E9E5E7', lineHeight: '2.5'}}
                  placeholder={placeHolderText}
                  type="text"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
                   
              </div>
              <div className="flex flex-col gap-1 justify-center items-center text-lg font-medium">
                <div className="absolute bottom-1 right-4">
                  <Button
                    buttonText="Next"
                    onClick={() => {setStep(1)}
                  }
                    className="bg-bold-pink hover:bg-bold-pink-hover text-white text-sm p-3 rounded-3xl w-[106px] h-[26px]"
                  />
                </div>
              </div>
            </>
          )}
            {step === 1 && (
            <>
              <div className="flex flex-col w-full">
                <div className="w-3/4 flex items-start justify-start">
                  <p className="text-2xl font-medium">{headers[1]}</p>
                </div>
              </div>       
              <CustomInput
                {...animateQuickDownToUpWithDelay(0.1)}
                initial={{ opacity: 0, y: 250 }}
                type="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="text-sm text-[#97A2A7] w-full h-full"
              />

              <div className="absolute bottom-1 right-4">
                  <Button
                    buttonText="Next"
                    onClick={() => {setStep(2)}
                  }
                  className="bg-bold-pink hover:bg-bold-pink-hover text-white text-sm p-3 rounded-3xl w-[106px] h-[26px]"
                  />
                
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex flex-col w-full">
                <div className="w-3/4 flex items-start justify-start">
                  <p className="text-2xl font-medium self-start">{headers[2]}</p>
                </div>
              </div>
              <div>
                <label htmlFor={"location"} className="self-start py-0 font-medium">
                  Current Location
                </label>
                <CustomInput
                  {...animateQuickDownToUpWithDelay(0.1)}
                  initial={{ opacity: 0, y: 250 }}
                  type="text"
                  placeholder="Fetching your location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  id="location"
                  className="text-xs text-[#97A2A7] p-0 w-full h-[28px]"
                  readOnly
                />
                <p className="font-medium">or</p>
                <GoogleAutocompleteInput
                  value={manualLocation}
                  onChange={setManualLocation}
                  className="text-xs text-[#97A2A7] p-0 w-full h-[28px] rounded shadow-lg max-sm:w-[85%] bg-[#E9E5E7] border-none focus:outline-none"
                  placeholder="Enter a location"
                  required
                />
              </div>
              
          
              <div className="absolute bottom-1 right-4">
                  <Button
                    buttonText="Next"
                    onClick={() => {setStep(3)}
                  }
                  className="bg-bold-pink hover:bg-bold-pink-hover text-white text-sm p-3 rounded-3xl w-[106px] h-[26px]"
                  />
                
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="flex flex-col w-full">
                <div className="w-3/4 flex flex-col items-start justify-start">
                  <p className="text-2xl font-medium self-start">{headers[3]}</p>
                  <p className="text-xs font-normal self-start">Choose up to 3 stickers to describe how you spread goodness</p>
                </div>
              </div>
              <Stickers {...animateQuickDownToUpWithDelay(0.5)} select={selectSticker} />
          
              <div className="absolute bottom-1 right-4">
                  <Button
                    buttonText="Submit"
                    onClick={() => {setStep(4)
                    }
                  }
                  className="bg-bold-pink hover:bg-bold-pink-hover text-white text-sm p-3 rounded-3xl w-[106px] h-[26px]"
                  />  
              </div>

              <div className="absolute bottom-1 left-4">
                <p className="text-lg font-medium">Add a photo!</p>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    className="hidden text-xs"
                  />
                  <label htmlFor="file" className="text-xs cursor-pointed border-[1px] p-.5 md:p-3 border-gray-400 bg-gray-200">
                    {file ? file.name : "Choose a file"}
                  </label>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="flex flex-col w-full">
                <div className="w-3/4 flex flex-col items-start justify-start">
                  <p className="text-3xl font-medium self-start text-bg-bold-pink">{headers[4]}</p>
                  <p className="text-sm font-normal self-start">
                  Now it’s time to <span className="text-yellow-500">nominate</span> others to join the challenge!
                </p>
              
              <Button
                type="submit"
                buttonText="Nominate Others"
                onClick={() => {
                  setNewPost();
                  toNominate();
                }}
                className="bg-bold-yellow hover:bg-bold-yellow-hover text-white p-5 rounded-md"
              />

                </div>
              </div>
          
            </>
          )}

        </form>
      </div>
    </div>
  );
    
};

export default NewCard;