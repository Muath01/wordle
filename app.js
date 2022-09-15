const letters = document.getElementsByClassName("letter");
const boxes = document.getElementsByClassName("box");
const enter = document.getElementById("enter");
const deleteLetter = document.getElementById("delete");




var i = 0 
var y = 0

const word = "crape"; // The word that you'll have to guess. 
const arr = word.split(""); //Spliting the word in an array of letters
var input = []; // The letters you input as guesses
let letterDiv = []; //This holds the parent element of the input, basically so we can change the background colour of the letter divs depending on user guess


var z = 0;
for (const letter of letters){
    letter.addEventListener("click", (e)=>{

        if(y == 0 || y % 5 != 0){ //here we use y not i because we use to call for array positions, this gives us the freedom to have different values for y as long as they're not: % 5 == 0
            i++
            y++
            boxes[i-1].value = letter.innerText;
            y = i ; //y was likely bigger than i, this is because y % 5 == 0 will not enter the f statement, so we increment y in the Enter button click, and here we return it back to it's right value.  
            input.push(letter.innerText.toLowerCase()) //Our input array gets the letters in lower case
            letterDiv.push(letter) // This is an array of divs, allows us to manipulate the style of the letter divs depending on user input. 

        }

        console.log("x: ", i, "y: ", y) //Checking to make sure i and y are equal in value. 

    
    })}

enter.addEventListener("click", ()=>{

    
    if(y!=0 && y%5 == 0){ //Opposite of the above code. 
    

        y++ //this increments so we can enter the for loop in the letter click event above. 

        const sim = () => input.map((char, i) => { //This function tells us if a letter input exists within an array but not in right spot, allows us to mark boxes yello. 

            const index = arr.indexOf(char)

            // console.log(`Char: ${char} i:${i} index:${index}`)
            return index !== -1 &&  index !== i //first condition checks if index != -1, if true that means our index exists within the array, second condition check if our index is in the 
                                                //same location as the original letter, if not it returns true. We don't want it to be in the same position. 

            //more:
            /*
            arr1 = ["h", "e", "l", "l", "o"]
            arr2 = ["e", "h"]

            In this instance, the function will return [true, true], that's because "e" in arr2 exists in arr1 but in the wrong postion(second return condition), and same for "h". 

            arr1 = ["h", "e", "l", "l", "o"]
            arr2 = ["h", "e"]

            This will return false, because though "h" and "e" exist in arr1, they're in the right postion. 
            */
          }) //=> [true, true]

        for(var i = 0; i < arr.length; i++){
            const simx = sim();
            if(arr[i].toLowerCase() == input[i].toLowerCase()){ //Checks if input letter is equal in position to our arr of secret word. 
                boxes[z].style.background = "green"
                letterDiv[i].style.background = "green"
                z++
                
            }else if(simx[i] === true){ // this is the map function above, if true, that means the input exist in our array but in the wrong place. 
                boxes[z].style.background = "yellow"
                letterDiv[i].style.background = "yellow"
                z++

            }
            
            else if (simx[i] == false){ //this is probably not the smartest thing to do, but as long as we have simx function at the bottom we should be safe, the simx function can return false even if the input
                                        // exists in our array because it checks for position too, but because we have this else if at the bottom, we will only get here if the first if statement is false. 
                boxes[z].style.background = "red"
                letterDiv[i].style.background = "red"
                z++
            }
        }
        input = []; //Clears the inputs to take in the next 5 letter
        letterDiv = []; // Clears letter divs to take in the next 5 letters. 

    }else{
    }
    
})

deleteLetter.addEventListener("click", ()=>{
    if(y % 5 != 0){ // This insures the we don't delete words that are entered, 
        input.pop(); // remove the last letter input. 
        letterDiv.pop() // remove the last letter div.
        boxes[i-1].value = "";
        i--;
        y = i;
        console.log("x: ", i, "y: ", y)
    }else{
        y++; // This insures that if we input 5 letters but do not enter, we can still delete. 
    }
})
    