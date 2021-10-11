import { getCurrentPlayerCt, setMyPlayerData, addPlayer, removeCurrentPlayer } from "./firebase.js"
console.log("fired up!")

//check if the person has the credentials
checkIfBeenHereBefore()

let box = document.getElementById("my-dot")

//setting name as person's name from local storage
const name = localStorage.getItem("name")
box.innerHTML = name

//set dot color
const color = localStorage.getItem("color")
box.style.background = color

//start updating player count on page
getCurrentPlayerCt()

//box moving script
document.addEventListener('keydown', (event) => {
    var name = event.key
    var code = event.code

    if(code.includes("Arrow")){

        let direction = code.substring(5,code.length)


        let leftOffset = box.offsetLeft
        let topOffset = box.offsetTop

        console.log(box.offsetTop)
        console.log(box.offsetLeft)

        // alert(direction)
        if(direction == "Up"){
            box.style.top = (topOffset).toString() + "px"
        }
        else if(direction == "Down"){
            console.log("heree")
            box.style.top = (topOffset + box.offsetHeight).toString() + "px"
        }
        else if(direction == "Left"){
            box.style.left = (leftOffset).toString() + "px"
        }
        else if(direction == "Right"){
            box.style.left = (leftOffset + box.offsetWidth).toString() + "px"
        }

        
        getAndSetUserBoxLocation()
    }
})

document.getElementById("testing").addEventListener('click', (event) => {
    getAndSetUserBoxLocation()
});

//get user box proportions and update it in firebase
function getAndSetUserBoxLocation(){
    
    let screenWidth = window.innerWidth
    let screenHeight = window.innerHeight
    // box.offsetLeft
    // console.log('width: ' + screenWidth + " height: " + screenHeight)

    let topOffset = box.offsetTop
    let leftOffset = box.offsetLeft

    // console.log("top: " + topOffset + " left: " + leftOffset)

    let partFromTop = (topOffset / screenHeight) * 100
    let partFromLeft = (leftOffset / screenWidth) * 100

    console.log(partFromTop + " " + partFromLeft)

    setMyPlayerData(name, partFromTop, partFromLeft)
}

function checkIfBeenHereBefore(){
    let namecheck = localStorage.getItem("name")
    let idcheck = localStorage.getItem("id")
    let colorcheck = localStorage.getItem("color")
    if(namecheck == null || idcheck == null || colorcheck == null){
        window.location.href = "./starting/starting.html"
    }
    else{
        addPlayer(namecheck, 48.9, 48.9)
    }
}
window.onbeforeunload = function (event) {
    var message = 'you wanna leave D:??';
    console.log("hi")
    removeCurrentPlayer()
    return message;
}

