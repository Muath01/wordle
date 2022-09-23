

class Wordle{
    constructor(){
        this.letters = document.getElementsByClassName("letter");
        this.boxes = document.getElementsByClassName("box");
        this.enter = document.getElementById("enter");
        this.deleteLetter = document.getElementById("delete");
        this.i = 0;
        this.y = 0;
        this.z = 0;
        this.tick;
        this.word = null;
        // this.word = "crape"; // The word that you'll have to guess. 
        // this.arr = this.word.split(""); //Spliting the word in an array of letters
        this.input = []; // The letters you input as guesses
        this.letterDiv = []; //This holds the parent element of the input, basically so we can change the background colour of the letter divs depending on user guess;
        this.finishIndex = 0;

    }

    async initWord() {
        this.word = await this.getRandomUser();
        this.arr = this.word.split("");
      }

    getRandomUser() {
        try{
            return new Promise(async (resolve) => {
              async function fetchUser() {
                const res = await fetch("https://random-word-api.herokuapp.com/word");
                const data = await res.json();
                if (data[0].length === 5) {
                    return data[0];
                  }
                  return await fetchUser()
              }
              return resolve(await fetchUser())
          })

        }catch(ee){
            console.log(ee)
        }
    }

    start(){
        for (const letter of this.letters){
            
            letter.addEventListener("click", (e)=>{
                
        
                if(this.y != 0 && this.y%5 == 0 ){ //Checking if we inputed 5 letters, if we did, we'll ask user to press enter. 
                    
                    setTimeout(() => {
                         this.enter.classList.toggle("flash")
                    }, 500);
                    this.enter.classList.toggle("flash")
                }
        
        
                if(this.y == 0 || this.y % 5 != 0){ //here we use y not i because we use to call for array positions, this gives us the freedom to have different values for y as long as they're not: % 5 == 0
                    this.i++;
                    this.y++;
                    this.boxes[this.i-1].value = letter.innerText;
                    this.y = this.i ; //y was likely bigger than i, this is because y % 5 == 0 will not enter the f statement, so we increment y in the Enter button click, and here we return it back to it's right value.  
                    this.input.push(letter.innerText.toLowerCase()) //Our input array gets the letters in lower case
                    this.letterDiv.push(letter) // This is an array of divs, allows us to manipulate the style of the letter divs depending on user input. 
        
                }
        
        
            
            })
    }
}

    // function three
    initEnter(){
        this.enter.classList.remove("flash") // incase the user kept clicking letters instead of enter.

        if(this.y!=0 && this.y%5 == 0){ //Opposite of the above code. 
        this.finishIndex++;    
        console.log("enter", this.finishIndex)



            this.y++ //this increments so we can enter the for loop in the letter click event above. 
    
            const sim = () => this.input.map((char, i) => { //This function tells us if a letter input exists within an array but not in right spot, allows us to mark boxes yello. 
    
                const index = this.arr.indexOf(char)
    
                // console.log(`Char: ${char} i:${i} index:${index}`)
                return index !== -1 &&  index !== i //first condition checks if index != -1, if true that means our index exists within the array, second condition check if our index is in the 
                                                    //same location as the original letter, if not it returns true. We don't want it to be in the same position. 
    
              })
    
            for(var i = 0; i < this.arr.length; i++){
                const simx = sim();
                if(this.arr[i].toLowerCase() == this.input[i].toLowerCase()){ //Checks if input letter is equal in position to our arr of secret word. 
                    this.boxes[this.z].style.background = "green"
                    this.letterDiv[i].style.background = "green"
                    this.z++
                    
                }else if(simx[i] === true){ // this is the map function above, if true, that means the input exist in our array but in the wrong place. 
                    this.boxes[this.z].style.background = "yellow"
                    this.letterDiv[i].style.background = "yellow"
                    this.z++
    
                }
                
                else if (simx[i] == false){ //this is probably not the smartest thing to do, but as long as we have simx function at the bottom we should be safe, the simx function can return false even if the input
                                            // exists in our array because it checks for position too, but because we have this else if at the bottom, we will only get here if the first if statement is false. 
                    this.boxes[this.z].style.background = "red"
                    this.letterDiv[i].style.background = "red"
                    this.z++
                }
            }
            this.input = []; //Clears the inputs to take in the next 5 letter
            this.letterDiv = []; // Clears letter divs to take in the next 5 letters.

            setTimeout(() => {
                if(this.finishIndex == 5){
                    alert(`The secret word was ${this.word}`)
                } 
            }, 0);
    
        }else{
        }
        
    }
    initDelete(){
        this.deleteLetter.addEventListener("click", ()=>{
            if(this.y % 5 != 0){ // This insures the we don't delete words that are entered, 
                this.input.pop(); // remove the last letter input. 
                this.letterDiv.pop() // remove the last letter div.
                this.boxes[this.i-1].value = "";
                this.i--;
                this.y = this.i;
                console.log("x: ", this.i, "y: ", this.y)
            }else{
                // y++; // This insures that if we input 5 letters but do not enter, we can still delete. 
            }
        })
    }
}



window.addEventListener("load",function(){
    function remove(){
        const loader = document.querySelector(".loader")
        console.log(loader)
        loader.style.display = "none";
    }
    this.setTimeout(remove, 1);
})

const wordle = new Wordle()

wordle.initWord();


setTimeout(() => {
    wordle.start();
}, 5000);


wordle.enter.addEventListener("click", ()=>{

    wordle.initEnter();
}
)

wordle.initDelete();


