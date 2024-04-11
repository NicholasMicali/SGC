import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 

export const doCreateUserProfile = async (uid, email, name, age, location) => {
  const userDoc = doc(db, "user_profiles", uid);  // Create a reference to the user profile document
  return setDoc(userDoc, {
    name,
    email,
    age,
    location
  }, { merge: true });  // Use setDoc to merge data
};