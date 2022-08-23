var number = document.getElementsByClassName("numbers")[0];
const nmb = document.querySelector("#number");
const btnContainer = document.querySelector(".btn-container");
const results = document.querySelector(".results");
const howToP = document.querySelector(".how-to-play");
const htp = document.querySelector(".htp");
const backBtn = document.querySelector(".back-btn");
const wonContainer = document.querySelector(".won-container");
const tryList = document.querySelector(".try-list");

let randomNumber = Math.round(100 + Math.random() * (999 - 100));
let countTry = 0;
let updown = "";

nmb.addEventListener("keyup", function (event) {
  if (nmb.value.length > 3) {
    nmb.value = nmb.value.slice(0, 3);
  }
  if (event.key === "Enter") {
    if (updown !== "Correct") {
      startGame();
    }
  }
});

function startGame() {
  if (nmb.value != "") {
    // console.log(randomNumber);
    btnContainer.style.display = "none";
    results.style.display = "block";
    if (nmb.value == randomNumber) {
      countTry += 1;
      updown = "Correct";
      showCorrect();
      addTryResult(nmb.value, updown, countTry);
      countTry = 0;
      randomNumber = Math.round(100 + Math.random() * (999 - 100));
    } else if (nmb.value > randomNumber) {
      updown = "Down";
      countTry += 1;
      addTryResult(nmb.value, updown, countTry);
      nmb.value = "";
    } else if (nmb.value < randomNumber) {
      updown = "Up";
      countTry += 1;
      addTryResult(nmb.value, updown, countTry);
      nmb.value = "";
    }
  } else {
    console.log("sayı girişi yapın");
  }
}

function playAgain() {
  countTry = 0;
  results.innerHTML = " ";
  startGame();
}

function showCorrect() {
  results.style.display = "none";
  wonContainer.style.display = "block";
  wonContainer.innerHTML = `
  <img src="./img/firework.gif" alt="gif" class="img-gif" />
  <h2 class="won-try">You won in ${countTry} tries</h2>
  <button onclick="javascript:location.reload(true)" class="btn again">Play Again</button>`;
}

function addTryResult(n, updown, ctry) {
  const result = document.createElement("div");
  result.className = "result";
  result.innerHTML = `
  <div class="sayi">${n}</div>
  <div class=up-down>${updown}</div>
  <div class="right-place">${ctry}</div>`;
  tryList.prepend(result);
  if (tryList.childElementCount > 8) {
    tryList.removeChild(tryList.lastChild);
  }
}

function howToPlay() {
  btnContainer.style.display = "none";
  number.style.display = "none";
  htp.innerHTML = `
  <div class="how-to-play">
  <div class="explanation">
    <a href="javascript:location.reload(true)">
      <button class="back-btn">
          <span class="material-symbols-outlined"> arrow_back </span>
      </button>
    </a>
    <h2>How to Play ?</h2>
    <ol class="list">
      <li>
        To play, the game chooses a mystery number and the player enters
        their first guess.
      </li>
      <li>
        Players get feedback on whether their guesses are greater or
        less than the mystery number.
      </li>
      <li>
        The player continues to make a series of educated guesses to
        further eliminate potential numbers until the mystery number is
        solved.
      </li>
      <li>You should guess the number in as few tries as possible.</li>
    </ol>
  </div>
  <img src="./img/animation.gif" alt="thinking" />
</div>`;
}
