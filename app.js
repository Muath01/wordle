const letters = document.getElementsByClassName("letter");
const boxes = document.getElementsByClassName("box");
const enter = document.getElementsByClassName("enter")[0]


var i = 0
var y = 0



const word = "hello";
const arr = word.split("");
var input = [];

const found = input.some(r=> arr.indexOf(r) >= 0)

var z = 0;
for (const letter of letters){
    letter.addEventListener("click", (e)=>{
        var event =  e.target.innerText
        console.log(event)
        if(y == 5 || y == 10 || y==15 || y==20 || y== 25){
            console.log("press enter")
            console.log(y)
        }


        if(y != 5 && y != 10 && y!=15 && y!=20 && 25){
        // if(2+2==4){
            i++
            y++
            boxes[i-1].value = letter.innerText;
            y = i ;
            // console.log(`heretoo i:${i}  y:${y}`)
            input.push(letter.innerText)
            
        }
        enter.addEventListener("click", ()=>{
            console.log("before", e.target.innerText)
            y++;
            
            if(y!=0 && y%5 == 0){
                y+=1.2

                // if(!arr.includes(letter.innerText.toLowerCase())){
                //     letter.style.background = "red"
                //     boxes[i-1].style.background = "red"
                // }

                
                for(var i = 0; i < arr.length; i++){
                    if(arr[i].toLowerCase() == input[i].toLowerCase()){
                        boxes[z].style.background = "green"
                        z++
                        
                    }else{
                        boxes[z].style.background = "red"
                        e.target.style.background = "red"
                        z++
                    }
                }

                input = [];

            }else{
            }
            
    })
    
    })
}