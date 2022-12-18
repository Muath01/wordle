

class Wordle {
    constructor() {
        this.outerDiv = document.querySelector(".outer-div")
        this.letters = document.getElementsByClassName("letter");
        this.boxes = document.getElementsByClassName("box");
        this.enter = document.getElementById("enter");
        this.deleteLetter = document.getElementById("delete");
        this.i = 0;
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
        console.log(this.arr)
    }

    getRandomUser() {
        try {
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

        } catch (ee) {
            console.log(ee)
        }
    }

    start() {
        for (const letter of this.letters) {

            letter.addEventListener("click", (e) => {



                if (this.input.length == 5) { //Checking if we inputed 5 letters, if we did, we'll ask user to press enter. 

                    setTimeout(() => {
                        this.enter.classList.toggle("flash")
                    }, 500);
                    this.enter.classList.toggle("flash")
                }


                if (this.input.length < 5) { //here we use y not i because we use to call for array positions, this gives us the freedom to have different values for y as long as they're not: % 5 == 0
                    this.i++;

                    this.boxes[this.i - 1].value = letter.innerText;
                    this.input.push(letter.innerText.toLowerCase()) //Our input array gets the letters in lower case
                    this.letterDiv.push(letter) // This is an array of divs, allows us to manipulate the style of the letter divs depending on user input. 

                }



            })
        }
    }

    // function three
    initEnter() {
        this.enter.classList.remove("flash") // incase the user kept clicking letters instead of enter.

        if (this.input.length == 5) { //Opposite of the above code. 
            this.finishIndex++;
            console.log("enter", this.finishIndex)




            const sim = () => this.input.map((char, i) => { //This function tells us if a letter input exists within an array but not in right spot, allows us to mark boxes yello. 

                const index = this.arr.indexOf(char)

                // console.log(`Char: ${char} i:${i} index:${index}`)
                return index !== -1 && index !== i //first condition checks if index != -1, if true that means our index exists within the array, second condition check if our index is in the 
                //same location as the original letter, if not it returns true. We don't want it to be in the same position. 

            })

            for (var i = 0; i < this.arr.length; i++) {
                const simx = sim();
                if (this.arr[i].toLowerCase() == this.input[i].toLowerCase()) { //Checks if input letter is equal in position to our arr of secret word. 
                    this.boxes[this.z].style.background = "green"
                    this.letterDiv[i].style.background = "green"
                    console.log(`i:${this.i}  z:${this.z}`)
                    this.z++

                } else if (simx[i] === true) { // this is the map function above, if true, that means the input exist in our array but in the wrong place. 
                    this.boxes[this.z].style.background = "yellow"
                    this.letterDiv[i].style.background = "yellow"
                    console.log(`i:${this.i}  z:${this.z}`)
                    this.z++;

                }

                else if (simx[i] == false) { //this is probably not the smartest thing to do, but as long as we have simx function at the bottom we should be safe, the simx function can return false even if the input
                    // exists in our array because it checks for position too, but because we have this else if at the bottom, we will only get here if the first if statement is false. 
                    this.boxes[this.z].style.background = "red"
                    this.letterDiv[i].style.background = "red"
                    console.log(`i:${this.i}  z:${this.z}`)

                    this.z++
                }
            }
            this.input = []; //Clears the inputs to take in the next 5 letter
            this.letterDiv = []; // Clears letter divs to take in the next 5 letters.


            setTimeout(() => {
                if (this.finishIndex == 5) {
                    alert(`The secret word was ${this.word}`)

                    const replay = document.getElementById("replay")
                    replay.style.display = "flex"
                    replay.addEventListener("click", () => {
                        this.restart();
                        replay.style.display = "none";
                    })
                }
            }, 1000);



        } else {
        }

    }
    loadingScreen() {
        const game = document.getElementById("game")
        const word = document.getElementById("word")
        const final = document.getElementById("final")

        // Starts of with "fetching your game" tag showing and everything else hidden. 

        word.style.display = "none";
        final.style.display = "none";
        setTimeout(() => {
            game.style.display = "none"
        }, 2000); // Three seconds in, "fetching your game" tag is gone, and (look below) "picking a secret word" shows

        setTimeout(() => {
            word.style.display = "block";
        }, 2000);

        setTimeout(() => {
            word.style.display = "none"; //"picking a secret word" tag is gone, and "final toches becomes visible"
            final.style.display = "block";
        }, 6000);

        this.outerDiv.style.display = "none";

        window.addEventListener("load", function () {
            function remove() {
                const loader = document.querySelector(".loader")
                wordle.outerDiv.style.display = "block";
                loader.style.display = "none";
            }
            this.setTimeout(remove, 1);
        })
    }

    restart() {
        this.i = 0;
        this.z = 0;
        this.finishIndex = 0;
        this.input = [];
        console.log("oowowoow")
        for (const letter of this.letters) {
            console.log("leterDiv")
            letter.style.background = "white";
        }
        for (const box of this.boxes) {
            console.log("here")
            box.style.background = "#8e92ad";
            box.value = "";

        }
        document.getElementById("replay").style.display = "none";
    }
    initDelete() {

        if (this.input.length != 0) { // This insures the we don't delete words that are entered, 
            console.log("input before pop", this.input)
            this.input.pop(); // remove the last letter input. 
            console.log("input after pop", this.input)

            console.log("ltter Div before the pop", this.letterDiv)
            this.letterDiv.pop() // remove the last letter div.
            console.log("ltter Div after the pop", this.letterDiv)
            this.boxes[this.i - 1].value = "";
            this.i--;
        } else {
            console.log("else")
        }
    }
}




const wordle = new Wordle()

wordle.initWord();
wordle.loadingScreen();
wordle.start();

wordle.enter.addEventListener("click", () => {

    wordle.initEnter();
}
)

wordle.deleteLetter.addEventListener("click", () => {
    wordle.initDelete();
})


