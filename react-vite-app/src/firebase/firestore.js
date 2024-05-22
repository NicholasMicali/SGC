import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc, updateDoc, arrayUnion, getDoc, query, where, getDocs, deleteDoc, arrayRemove } from "firebase/firestore";


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


export const doUpdateUserProfile = async (uid, email, userType, firstName, lastName, location, image) => {
  const userDocRef = doc(db, "user_profiles", uid);
  return updateDoc(userDocRef, {
    userType,
    firstName,
    lastName,
    email,
    location,
    image,
  }, { merge: true });
};

export const doDeleteUserProfile = async (uid) => {
  const userDocRef = doc(db, "user_profiles", uid);
  try {
    await deleteDoc(userDocRef);
    console.log("Profile deleted successfully");
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error;
  }
};


export const doCreateCard = async (uid, title, code, cEmail) => {
  const cardsCollectionRef = collection(db, "cards");

  // Add a new document with a generated id to the 'cards' collection
  return addDoc(cardsCollectionRef, {
    uid,
    title,
    code,
    cEmail,
  });
};


export const doCardToUserProfile = async (uid, cardId) => {
  const userDocRef = doc(db, "user_profiles", uid);
  return updateDoc(userDocRef, {
    cards: arrayUnion(cardId) // Adds the new cardId to the 'cards' array without duplicates
  }, { merge: true });
};

export const doDeleteCard = async (cid) => {
  const cardDocRef = doc(db, "card", cid);
  return deleteDoc(cardDocRef);
}

export const doRemoveCardFromUserProfile = async (uid, cardId) => {
  const userDocRef = doc(db, "user_profiles", uid);
  try {
    await updateDoc(userDocRef, {
      cards: arrayRemove(cardId) // Removes the cardId from the 'cards' array
    });
    console.log("Card removed from user profile successfully.");
  } catch (error) {
    console.error("Error removing card from user profile:", error);
    throw new Error("Failed to remove card from user profile");
  }
};


export const doCreatePost = async (cid, uid, uName, desc, location, image) => {
  const postsCollectionRef = collection(db, "posts");
  console.log(image);
  return addDoc(postsCollectionRef, {
    cid,
    uid,
    uName,
    desc,
    location,
    image,
  });
};

export const doPostToCard = async (cid, postId) => {
  const cardDocRef = doc(db, "cards", cid);
  return updateDoc(cardDocRef, {
    posts: arrayUnion(postId)
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



export const doFetchCardByCode = async (code) => {
  const cardsCollectionRef = collection(db, "cards");

  // Create a query that finds cards where the 'code' field matches the provided code
  const q = query(cardsCollectionRef, where("code", "==", code));

  try {
    const querySnapshot = await getDocs(q);
    const cards = [];

    // Check if no documents were found
    if (querySnapshot.empty) {
      return null;
    }

    const firstDoc = querySnapshot.docs[0];
    return firstDoc;

  } catch (error) {
    console.error("Error fetching cards by code:", error);
    return null;
  }
};




export const doFetchPost = async (pid) => {
  const postDocRef = doc(db, "posts", pid);
  return getDoc(postDocRef);
}

