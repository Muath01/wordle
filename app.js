const letters = document.getElementsByClassName("letter");
const boxes = document.getElementsByClassName("box");
const enter = document.getElementById("enter");
const deleteLetter = document.getElementById("delete");




var i = 0
var y = 0

const word = "crape";
const arr = word.split("");
var input = [];
var ev = [];
let letterDiv = [];


var z = 0;
for (const letter of letters){
    letter.addEventListener("click", (e)=>{

        if(y == 0 || y % 5 != 0){
            i++
            y++
            boxes[i-1].value = letter.innerText;
            y = i ;
            input.push(letter.innerText.toLowerCase())
            letterDiv.push(letter)

        }
        // }else{
        //     console.log("here")
        //     y = i;
        // }

        console.log("x: ", i, "y: ", y)

    
    })}

enter.addEventListener("click", ()=>{

    ev = ev.slice(-1);
    
    if(y!=0 && y%5 == 0){
    

        y++
        const sim = () => input.map((char, i) => {
            const index = arr.indexOf(char)

            // console.log(`Char: ${char} i:${i} index:${index}`)
            return index !== -1 &&  index !== i
          }) //=> [true, true]

        for(var i = 0; i < arr.length; i++){
            const simx = sim();
            if(arr[i].toLowerCase() == input[i].toLowerCase()){
                boxes[z].style.background = "green"
                letterDiv[i].style.background = "green"
                z++
                
            }else if(simx[i] === true){
                boxes[z].style.background = "yellow"
                letterDiv[i].style.background = "yellow"
                z++

            }
            
            else if (simx[i] == false){
                boxes[z].style.background = "red"
                letterDiv[i].style.background = "red"
                z++
            }
        }
        input = [];
        letterDiv = [];

    }else{
    }
    
})

deleteLetter.addEventListener("click", ()=>{
    input.pop();
    letterDiv.pop()
    boxes[i-1].value = "";
    i--;
    y = i;
    console.log("x: ", i, "y: ", y)
})
    