const letters = document.getElementsByClassName("letter");
const boxes = document.getElementsByClassName("box");
const enter = document.getElementsByClassName("enter")[0]


var i = 0
var y = 0



const word = "hello";
const arr = word.split("");
var input = [];

var z = 0;
for (const letter of letters){
    letter.addEventListener("click", ()=>{
        
        if(y == 5 || y == 10 || y==15 || y==20 || y== 25){
            console.log("press enter")
            console.log(y)
        }


        console.log("before the if")
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
            y++;
            
            if(y!=0 && y%5 == 0){
                y+=1.2
                console.log(y)
                console.log("isnide the f")


                // if(!arr.includes(letter.innerText.toLowerCase())){
                //     letter.style.background = "red"
                //     boxes[i-1].style.background = "red"
                // }

                
                for(var i = 0; i < arr.length; i++){
                    if(arr[i].toLowerCase() == input[i].toLowerCase()){
                        console.log("EQUAL")
                        boxes[z].style.background = "green"
                        z++
                        console.log("z:",z)
                    }else{
                        console.log("No EQUAL")
                    }
                }

                input = [];

            }else{
            }
            
    })
    
    })
}