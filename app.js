const letters = document.getElementsByClassName("letter");
const boxes = document.getElementsByClassName("box");
const enter = document.getElementsByClassName("enter")[0]


var i = 0
var y = 0



const word = "hello"

const arr = word.split("");

for (const letter of letters){
    letter.addEventListener("click", ()=>{
        
        if(y == 5 || y == 10 || y==15 || y==20 || y== 25){
            console.log("please press enter")
            console.log(i)
        }

        if(y != 5 && y != 10 && y!=15 && y!=20 && 25){
        // if(2+2==4){
            console.log(i)
            i++
            y++
            boxes[i-1].value = letter.innerText;
            y = i ;
            console.log(`heretoo i:${i}  y:${y}`)
        }
        enter.addEventListener("click", ()=>{
            y++;
            
            if(y!=0 && y%5 == 0){
                
                console.log(`Random Number ${Math.random()}`)
                // if(!arr.includes(letter.innerText.toLowerCase())){
                //     letter.style.background = "red"
                //     boxes[i-1].style.background = "red"
                // }

            }else{
                console.log("i", y)
            }
            
    })
    
    })
}