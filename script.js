console.log("hiiii")

let box = document.getElementById("dot")
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
    }
})

