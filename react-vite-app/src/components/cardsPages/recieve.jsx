import React, { useState, useEffect } from "react";
import { doCreatePost, doPostToCard, doFetchUserProfile, doFetchCardByCode, doCardToUserProfile, doIncrementUserPosts, doIncrementPost } from "../../firebase/firestore";
import { doUploadFile } from "../../firebase/storage.js"
import ThankYou from  "./thankYou.jsx"
import StickerDrop from "./stickerDrop.jsx";
import { ArrowLeft } from "lucide-react";
import GoogleAutocompleteInput from "../location/googleAutocompleteInput.jsx";
import { calculateDistance } from "../location/calculateDistance";
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

const Recieve = ({back, user, initCode, first, select, isNarrowScreen, selectChallenge}) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isCodeFound, setIsCodeFound] = useState(false);
  const [code, setCode] = useState('');
  const [cid, setCid] = useState('');
  const [currentCard, setCurrentCard] = useState(null);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState("");
  const [stickers, setStickers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
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
        if (first && initCode != null) {
          setCid(initCode);
          setIsCodeFound(true);
        }
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
  }, [userProfile]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isCreatingPost) {
      try {
        //console.log(cid);
        //const url = await upload();
        const userLocation = manualLocation ? manualLocation : location;
        const postLocation = userLocation ? userLocation : userProfile?.location;
        const distance = await calculateDistance(currentCard.lastLocation, postLocation);
        if (!distance) {
          console.log("Distance is null: " + distance);
        }
        const date = new Date();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const postDate = month + " " + day;
        const post = await doCreatePost(cid, user.uid, userProfile.firstName, desc, postLocation, postDate, userProfile.userType, image, stickers);
        await doPostToCard(cid, post.id, postLocation, distance);
        setCurrentCard(prevCard => ({
          ...prevCard,
          posts: [...prevCard.posts, post.id]
        }));
        await doCardToUserProfile(user.uid, cid);
        if (currentCard?.classrooms) {
          const classPromises = currentCard.classrooms.map(classId => doIncrementPost(classId));
          await Promise.all(classPromises);
        }
        await doIncrementUserPosts(user.uid);
        console.log("Post created: " + post);
      } catch (error) {
        console.error("Create post failed:", error);
        alert("Failed to post to card: " + error.message);
        return;
      }
      setIsCreatingPost(true);   
    }
  };

  const onCodeEntered = async (e) => {
    e.preventDefault();
    if (!isCodeFound){
      try {
        console.log(code);
        const card = await doFetchCardByCode(code);
        if (!card){
          console.log("no card found with code: " + code);
          alert("no card found with code: " + code);
          return;
        }
        setCid(card.id);
        setCurrentCard(card.data());
        setIsCodeFound(true);
      } catch (error) {
        console.error("Card not Found", error);
        alert("Failed to find card: " + error.message);
        return;
      }   
    }
  }

  const selectSticker = (src) => {
    if (stickers.length < 3) {
      setStickers([...stickers, src])
    }
    //console.log(stickers);
  }

/*   if (!isScriptLoaded) {
    return <div>Loading...</div>;
  } */

  if (isCreatingPost) {
    return (
      <>
        <ThankYou
          onButtonClick={() => select(currentCard, cid)}
          isNarrowScreen={isNarrowScreen}
          onChallenge={() => selectChallenge(currentCard, cid)}
        >
        </ThankYou>
      </>
    );
  }

  if (isCodeFound) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <button onClick={back} className="self-start flex items-center mt-4">
          <ArrowLeft /> Go Back
        </button>
        <div className="font-bold text-3xl">Post to card</div>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={'desc'} className="self-start">Description</label>
            <textarea
              className="h-64 resize-none rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder={"write about your act of kindness!"}
              type='text'
              id='desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
          </div>
          {(stickers.length > 0) &&
            <div className="flex flex-row self-start mt-8 items-center">
                {stickers.map((sticker) => (
                  <img src={sticker} className="w-8 h-8 mr-2"/>
                ))}
                <button onClick={(e) => {e.preventDefault; setStickers([]);}} className="rounded-2xl border-[1px] py-2 px-3 border-black">Clear</button>
            </div>
          }
          <StickerDrop select={selectSticker}/>
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
          </div>
          <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-4 bg-opacity-60 text-white font-sans text-xl">
            Post!
          </button>
        </form>
      </div>
    );
  }

  return(
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back} className="self-start flex items-center mt-4">
        <ArrowLeft /> Go Back
      </button>
      <div className="font-bold text-3xl">Recieved a card?</div>
      <form onSubmit={onCodeEntered} className="w-full flex flex-col gap-5 items-center">
        <div className="flex flex-col gap-1 w-full mt-6">
            <label htmlFor={'code'} className="self-start">Code</label>
            <input
              className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder="Enter code from the card (e.g., 12abc345)"
              pattern="^\d{2}[A-Za-z]{3}\d{3}$"
              title="Code should be in the format: 12abc345 (2 digits, 3 letters, 3 digits)"
              type='text'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
        </div>
        <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-6 bg-opacity-60 text-white font-sans text-xl">
          Next
        </button>
      </form>
    </div>
  )
};

export default Recieve;