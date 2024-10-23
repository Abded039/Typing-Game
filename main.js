// startButton.onclick = () => this.remove(); // arrow doesn't work with 'this';

//   [04] Your Trainings To Add Features
// ----[01] Save Score To Local Storage With Date
// ----[02] Choose Levels From Select Box
// ----[03] Break The Logic To More Functions
// ----[04] Choose Array Of Words For Every Level
// ----[05] Write Game Instruction With Dynamic Values
// ----[06] Add 3 Seconds For The First Word

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
// const word = [{ easy: "hi" }, { normal: "hello" }];

// setting levels
let lvl = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// default level
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvl[defaultLevelName];

// catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let restartBtn = document.querySelector(".restartBtn");

// setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event
input.onpaste = () => false; // arrow

// start game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate words function
  genWords();
};

function genWords() {
  // get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIndex = words.indexOf(randomWord);
  // remove random word
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // empty upcoming Words
  upcomingWords.innerHTML = "";
  // generate words
  for (let i = 0; i < words.length; i++) {
    // generate div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.append(div);
  }
  // call start play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds; // reset the time left to start from default timer to avoid -1, -2;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // stop timer
      clearInterval(start);
      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty input value
        input.value = "";
        // icrease score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("congratz");
          span.appendChild(spanText);
          finishMessage.append(span);
          upcomingWords.remove();
        }
      } else {
        restartBtn.style.display = "block";
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.append(span);
      }
    }
  }, 1000);
}

restartBtn.addEventListener("click", () => {
  location.reload();
});
