import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore";


export const doCreateUserProfile = async (uid, email, name, age, location) => {
  const userDoc = doc(db, "user_profiles", uid);  // Create a reference to the user profile document
  return setDoc(userDoc, {
    name,
    email,
    age,
    location
  }, { merge: true });  // Use setDoc to merge data
};

// Not tested yet: creates a new card which is tied to the user by the uid
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

// Also not tested: fetches user porfile details into a doc
export const doFetchUserProfile = async (uid) => {
  return db.collection("user_profiles").doc(uid).get()
}

export const doFetchCard = async (cid) => {
  return db.collection("cards").doc(cid).get()
}

/*
export const doFetchCards = async () => {

};

export const doFetchFeed = async () => {

};
*/