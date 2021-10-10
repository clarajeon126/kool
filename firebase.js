// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmmA2lIdYqBnl5GNpnm0MGL_RupBHYOIE",
  authDomain: "kool-dot.firebaseapp.com",
  projectId: "kool-dot",
  storageBucket: "kool-dot.appspot.com",
  messagingSenderId: "593675057807",
  appId: "1:593675057807:web:57ed7b128f82f94ad58efa",
  measurementId: "G-2YPRZ5YPHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export async function addName(name){
  try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name
      });
      console.log(name + " was added to the game!");
      return name
  } catch (error) {
    console.log("error: " + error);
  }
}