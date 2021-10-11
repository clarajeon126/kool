// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    onSnapshot,
    setDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOOEdH47DMeZ1TL8KqoJyE_jWR90Yj0Xw",
  authDomain: "kool-fb49c.firebaseapp.com",
  projectId: "kool-fb49c",
  storageBucket: "kool-fb49c.appspot.com",
  messagingSenderId: "127294885573",
  appId: "1:127294885573:web:7ad752a683e12e6336aaac",
  measurementId: "G-C1PPPLMGZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function getCurrentPlayerCt() {
  
    let myName = localStorage.getItem("name")
    const plyrCtSnapshot = await onSnapshot(collection(db, "players"), (snapShot) => {
      const plyrs = [];
      snapShot.forEach((doc) => {
        plyrs.push(doc.data());
      });

      plyrs.forEach( (plyr) => {
          if(plyr.name != myName){
            makeDot(plyr.name, plyr.position[0], plyr.position[1], plyr.color)
          }
      })
      console.log("current player ct: ", plyrs.length);
      document.getElementById("player-ct").innerHTML = "players: " + plyrs.length
    });
}
export async function addPlayer(name, posTop, posLeft){
    let ranNum = Math.floor(Math.random() * (3 - 0 + 1));
    let colorArr = ["rgb(247, 146, 86)", "rgb(125, 207, 182)", "rgb(0, 178, 202)", "rgb(29, 78, 137)"]
    let colorDot = colorArr[ranNum]
    localStorage["color"] = colorDot
    try {
        const docRef = await addDoc(collection(db, "players"), {
            name: name,
            position: [posTop, posLeft],
            color: colorDot
        });
        console.log(name + " was added to the game!");
        console.log(docRef.id)

        //set id
        localStorage["id"] = docRef.id
        return name
    } catch (error) {
        console.log("error: " + error);
    }
}

export async function setMyPlayerData(name, posTop, posLeft){
    try {

        let id = localStorage.getItem("id")
        let color = localStorage.getItem("color")
        console.log(id)
        const docRef = await setDoc(doc(db, "players", id), {
            name: name,
            position: [posTop, posLeft],
            color: color
        });
        console.log(name + " was added to the game!");
        return name
    } catch (error) {
        console.log("error: " + error);
    }
}

//make a new dot with the persons name
function makeDot(name, top, left, color) {

    let dots = document.getElementsByTagName(name + "dot")

    if (dots.length < 1){
        let newDot = document.createElement(name + "dot");
        newDot.className = "dot"
        newDot.innerHTML = name
        newDot.style.background = color
        newDot.style.top = top + "vh"
        newDot.style.left = left + "vw"
        document.body.appendChild(newDot)
    }
    else {
        dots[0].style.top = top + "vh"
        dots[0].style.left = left + "vw"
    }
    
}

export async function removeCurrentPlayer(){
    let id = localStorage["id"]
    await deleteDoc(doc(db, "players",id))
}


