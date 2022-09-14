const letters = document.getElementsByClassName("letter");
const boxes = document.getElementsByClassName("box");
const enter = document.getElementsByClassName("enter")[0]




var i = 0
var y = 0



const word = "hello";
const arr = word.split("");
var input = [];
var ev = [];
let letterDiv = [];


var z = 0;
for (const letter of letters){
    console.log("Loops")
    letter.addEventListener("click", (e)=>{


        if(y == 0 || y % 5 != 0){
            i++
            y++
            boxes[i-1].value = letter.innerText;
            y = i ;
            input.push(letter.innerText.toLowerCase())
            letterDiv.push(letter)
            
        }})}



enter.addEventListener("click", ()=>{




    console.log(letterDiv[letterDiv.length-1].innerText)
    
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
            console.log(simx[0])
            if(arr[i].toLowerCase() == input[i].toLowerCase()){
                boxes[z].style.background = "green"
                letterDiv[i].style.background = "green"
                z++
                
            }else if(simx[i] === true){
                console.log("here")
                letterDiv[i].style.background = "yellow"
            }
            
            else{
                boxes[z].style.background = "red"
                // letterDiv[i].style.background = "red"
                z++
            }
        }
        input = [];
        letterDiv = [];

    }else{
    }
    
})
    