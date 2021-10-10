import { addName } from "../firebase.js"

//run to check if they have a name or not


//add player
document.getElementById("submit-but").addEventListener('click', (event) => {
    let name = document.getElementById("name-input").value
    console.log(name)
    addName(name).then( name => {
        console.log("success adding user to db")

        //save to local
        localStorage["name"] = name
        //redirect to main
        window.location.href = "../index.html"
    })
});
  