import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvAIRcSGPJzhmbIw1W8jeIyblrQdXKmnQ",
  authDomain: "spreadgoodness-72ac1.firebaseapp.com",
  projectId: "spreadgoodness-72ac1",
  storageBucket: "spreadgoodness-72ac1.appspot.com",
  messagingSenderId: "805068639291",
  appId: "1:805068639291:web:665cc0e6555de57d3ca01e",
  measurementId: "G-2QJWF7EL3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }