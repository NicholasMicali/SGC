import { auth } from "./firebase";
import { getAuth } from 'firebase/auth';


import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, deleteUser } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const auth_user = await createUserWithEmailAndPassword(auth, email, password);
  return auth_user;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};


export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};


export const doDeleteUser = async () => {
  const auth = getAuth();
  try {
    await deleteUser(auth.currentUser);
    console.log("Auth user deleted successfully");
  } catch (error) {
    console.error("Failed to delete auth user:", error);
    throw error;
  }
};

/*
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
*/