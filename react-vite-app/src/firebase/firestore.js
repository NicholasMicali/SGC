import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";


export const doCreateUserProfile = async (uid, email, userType, firstName, lastName, location) => {
  const userDoc = doc(db, "user_profiles", uid);  // Create a reference to the user profile document
  return setDoc(userDoc, {
    userType,
    firstName,
    lastName,
    email,
    location
  }, { merge: true });  // Use setDoc to merge data
};


export const doCreateCard = async (uid, title, code, text, cEmail) => {
  const cardsCollectionRef = collection(db, "cards");

  // Add a new document with a generated id to the 'cards' collection
  return addDoc(cardsCollectionRef, {
    uid,
    title,
    code,
    text,
    cEmail,
  });
};

export const doCardToUserProfile = async (uid, cardId) => {
  const userDocRef = doc(db, "user_profiles", uid);
  return updateDoc(userDocRef, {
    cards: arrayUnion(cardId) // Adds the new cardId to the 'cards' array without duplicates
  }, { merge: true });
};


// Also not tested yet: creates a new post which is tied to a card by the cid
export const doCreatePost = async (cid, title, desc, location, images) => {
  const postDoc = doc(db, "cards"); 
  return setDoc(postDoc, {
    cid,
    title,
    desc,
    location,
    images,
  }, { merge: true });
};


export const doFetchUserProfile = async (uid) => {
  const userDocRef = doc(db, "user_profiles", uid);
  return getDoc(userDocRef);
  //const docSnap = await getDoc(userDocRef);
  /*
  if (docSnap.exists()) {
    return docSnap.data(); // Returns the document's data if available
  } else {
    throw new Error("No profile found for this user.");
  }
  */
}

export const doFetchCard = async (cid) => {
  const cardDocRef = doc(db, "cards", cid);
  return getDoc(cardDocRef);
}
