import React, { useState, useEffect } from "react";
import CustomInput from '../auth/customInput';
import { doCreateCard, doCardToUserProfile, doFetchUserProfile, doCreatePost, doPostToCard, doFetchCard, doIncrementCard, doIncrementUserCards, doFetchCardByCode } from "../../firebase/firestore";
import { doUploadFile } from "../../firebase/storage.js"
import ThankYou from  "./thankYou.jsx"
import StickerDrop from "./stickerDrop.jsx";
import { ArrowLeft } from "lucide-react";
import { geocodeBaseURL } from "../../firebase/googleMapsAPIKey";
import GoogleAutocompleteInput from "../location/googleAutocompleteInput.jsx";
import { formatLocation } from "../location/formatLocation.jsx"


const NewCard = ({back, user, select, isNarrowScreen, selectChallenge}) => {

  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [createdCard, setCreatedCard] = useState(null);
  const [cid, setCid] = useState(null);
  const [image, setImage] = useState('');
  const [file, setFile] = useState("");
  const [stickers, setStickers] = useState([]);
  const [location, setLocation] = useState('');
  const [manualLocation, setManualLocation] = useState('');

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
  }, [file]);

  useEffect(() => {
    // SUGGESTION: Maybe centralize this into a components/location/fetchLocation.jsx file
    // because it is used in both recieve and newCard and possibly will be used in
    // CreateProfile at some point
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `${geocodeBaseURL}&latlng=${latitude},${longitude}`
              );
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const formattedLocation = formatLocation(addressComponents);
                setLocation(formattedLocation);
              } else {
                console.error("No results found for the given coordinates.");
                setLocation('No results found for the given coordinates.');
              }
            } catch (error) {
              console.error("Error fetching location:", error);
              setLocation('Error fetching location.');
            }
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLocation('Error fetching location.');
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocation('Geolocation is not supported by this browser.');
      }
    };

    fetchLocation();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isCreatingCard){
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
        const card = await doCreateCard(user.uid, title, code, userProfile.email, classrooms);
        await doCardToUserProfile(user.uid, card.id);
        const postLocation = manualLocation ? manualLocation : location;
        const post = await doCreatePost(card.id, user.uid, userProfile.firstName, text, postLocation, image, stickers);
        const distance = 0;
        await doPostToCard(card.id, post.id, postLocation, distance);
        const cardObj = await doFetchCard(card.id);
        setCid(card.id);
        setCreatedCard(cardObj.data());
        //console.log(card);
        if (userProfile?.classrooms) {
          const classPromises = userProfile.classrooms.map(classId => doIncrementCard(classId));
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
      setStickers([...stickers, src])
    }
    //console.log(stickers);
  }

  if (isCreatingCard && createdCard) {
    return <>
      <ThankYou
        onButtonClick={() => select(createdCard, cid)} isNarrowScreen={isNarrowScreen} onChallenge={() => selectChallenge(createdCard, cid)}>
      </ThankYou>
   </>
  }

/*
        <CustomInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          labelName="Email"
        />
        <CustomInput
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="text"
          labelName="Text"
        />
        <CustomInput
          type="code"
          placeholder="45cat135"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="code"
          labelName="Code (must follow this format: 12abc345)"
        />
*/

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back} className="self-start flex items-center mt-4">
        <ArrowLeft /> Go Back
      </button>
      <div className="font-bold text-3xl">New Card</div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
        <CustomInput
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          labelName="Title"
        />
        <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={'code'} className="self-start">Code</label>
            <input
              className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder="Enter code (e.g., 12abc345)"
              pattern="^\d{2}[A-Za-z]{3}\d{3}$"
              title="Code must be in the format: 12abc345 (2 digits, 3 letters, 3 digits)"
              type='text'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
        </div>
        <div className="flex flex-col gap-1 w-full mt-3">
          <label htmlFor={'text'} className="self-start">Description</label>
          <textarea
            className="h-64 resize-none rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
            placeholder={"write about how you spread goodness!"}
            type='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <div className="self-start mt-6">Add a photo:</div>
          <img className="w-32 h-32 mb-2"
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
          <input
            type="file"
            id="file"
            onChange={(e) => { setFile(e.target.files[0]) }}
            className="mb-4"
          />
          {(stickers.length > 0) &&
            <div className="flex flex-row self-start mt-8 items-center">
                {stickers.map((sticker) => (
                  <img src={sticker} className="w-8 h-8 mr-2"/>
                ))}
                <button onClick={(e) => {e.preventDefault; setStickers([]);}} className="rounded-2xl border-[1px] py-2 px-3 border-black">Clear</button>
            </div>
          }
          <StickerDrop select={selectSticker}/>
        </div>
        <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={'location'} className="self-start">Location</label>
            <input
              className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder="Fetching your location..."
              type='text'
              id='location'
              value={location}
              readOnly
            />
            <div className="self-start mt-2">or</div>
            <GoogleAutocompleteInput
              value={manualLocation}
              onChange={setManualLocation}
              className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder="Enter a location (leave empty to use fetched location above)"
            />
          </div>
        <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-4 bg-opacity-60 text-white font-sans text-xl">
          Create Card!
        </button>
      </form>
    </div>
  );
};

export default NewCard;