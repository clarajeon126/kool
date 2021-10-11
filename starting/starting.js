import { addPlayer } from "../firebase.js"

//run to check if they have a name or not
if(localStorage.getItem("name") == null){
    console.log("first time!")
}

//add player
document.getElementById("submit-but").addEventListener('click', (event) => {
    let name = document.getElementById("name-input").value
    console.log(name)
    addPlayer(name, 48.9, 48.9).then( name => {
        console.log("success adding user to db")
        //save to local
        localStorage["name"] = name
        //redirect to main
        window.location.href = "../index.html"
    })
});
  