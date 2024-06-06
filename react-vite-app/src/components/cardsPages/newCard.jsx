import React, { useState, useEffect } from "react";
import CustomInput from "../auth/customInput";
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
import ThankYou from "./thankYou.jsx";
import StickerDrop from "./stickerDrop.jsx";
import { ArrowLeft } from "lucide-react";
import GoogleAutocompleteInput from "../location/googleAutocompleteInput.jsx";
import { animateQuickDownToUpWithDelay } from "../../constants/anim";
import { motion } from "framer-motion";
import { fetchLocation } from "../location/fetchLocation.jsx";
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

const NewCard = ({ back, user, select, isNarrowScreen, selectChallenge }) => {
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
      const location = await fetchLocation();
      if (location){
        //This is a temporary fix for when the fetch location does not work: (fix later)
        const postLocation = (location == "Error") ? userProfile?.location : location;
        setLocation(postLocation);
      }
      else {
        console.log("Failed to fetch location: " + location);
        setLocation(userProfile?.location);
      }
    }

    fetchLoc();
  }, [user.uid]);

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
    return (
      <>
        <ThankYou
          onButtonClick={() => select(createdCard, cid)}
          isNarrowScreen={isNarrowScreen}
          onChallenge={() => selectChallenge(createdCard, cid)}
        ></ThankYou>
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back} className="self-start flex items-center mt-4">
        <ArrowLeft /> Go Back
      </button>
      <motion.div
        {...animateQuickDownToUpWithDelay(0.1)}
        className="font-bold text-3xl"
      >
        New Card
      </motion.div>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-5 items-center"
      >
        <CustomInput
          {...animateQuickDownToUpWithDelay(0.1)}
          initial={{ opacity: 0, y: 250 }}
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          labelName="Title"
        />
        <motion.div
          {...animateQuickDownToUpWithDelay(0.2)}
          className="flex flex-col gap-1 w-full mt-3"
        >
          <label htmlFor={"code"} className="self-start">
            Code
          </label>
          <input
            className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
            placeholder="Enter code (e.g., 12abc345)"
            pattern="^\d{2}[A-Za-z]{3}\d{3}$"
            title="Code must be in the format: 12abc345 (2 digits, 3 letters, 3 digits)"
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </motion.div>
        <div className="flex flex-col gap-1 w-full mt-3">
          <motion.label
            {...animateQuickDownToUpWithDelay(0.3)}
            htmlFor={"text"}
            className="self-start"
          >
            Description
          </motion.label>
          <motion.textarea
            {...animateQuickDownToUpWithDelay(0.3)}
            className="h-64 resize-none rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
            placeholder={"write about how you spread goodness!"}
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <motion.div
            {...animateQuickDownToUpWithDelay(0.4)}
            className="self-start mt-6"
          >
            Add a photo:
          </motion.div>
          <motion.img
            {...animateQuickDownToUpWithDelay(0.4)}
            className="w-32 h-32 mb-2"
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
          <motion.input
            {...animateQuickDownToUpWithDelay(0.4)}
            type="file"
            id="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className="mb-4"
          />
          {stickers.length > 0 && (
            <motion.div
              {...animateQuickDownToUpWithDelay(0.5)}
              className="flex flex-row self-start mt-8 items-center"
            >
              {stickers.map((sticker) => (
                <img src={sticker} className="w-8 h-8 mr-2" />
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault;
                  setStickers([]);
                }}
                className="rounded-2xl border-[1px] py-2 px-3 border-black"
              >
                Clear
              </button>
            </motion.div>
          )}
          <StickerDrop {...animateQuickDownToUpWithDelay(0.5)} select={selectSticker} />
        </div>
        <motion.div className="flex flex-col gap-1 w-full mt-3" {...animateQuickDownToUpWithDelay(0.7)}>
          <label htmlFor={"location"} className="self-start">
            Location
          </label>
          <input
            className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
            placeholder="Fetching your location..."
            type="text"
            id="location"
            value={location}
            readOnly
          />
          <div className="self-start mt-2">or</div>
          {toggleManual ? 
              <>
                <button type="button" className="rounded-2xl border-[1px] w-[70px] py-2 px-3 border-black" onClick={()=> setToggleManual(false)}>Close</button>
                <GoogleAutocompleteInput
                  value={manualLocation}
                  onChange={setManualLocation}
                  className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
                  placeholder="Enter a location (leave empty to use fetched location above)"
                  required
                />
              </>
            :
             <button type="button" className="rounded-2xl border-[1px] py-2 px-3 border-black" onClick={()=> setToggleManual(true)}>Enter Location</button>
            }
        </motion.div>
        <motion.button
        {...animateQuickDownToUpWithDelay(0.8)}
          type="submit"
          className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-4 bg-opacity-60 text-white font-sans text-xl"
        >
          Create Card!
        </motion.button>
      </form>
    </div>
  );
};

export default NewCard;
