// const container = document.querySelector('.container')
// const input = document.querySelector('#input')
const boxesContainer = document.querySelector(".boxes-wrapper");
let inputDisplay = document.querySelector(".input-display");
const message = document.querySelector(".message");
const subMessage = document.querySelector(".sub-message");
const hint = document.querySelector(".hint");
let wrongLettersContainer = document.querySelector(".wrong-letters");
const remainingGuess = document.querySelector(".remaining-guess");
const button = document.querySelector(".reset-button");

let randomNumber;
let wordLetters;
let initialGuess;
let wrongLetters = [];
let boxes;
const words = [
  {
    word: "shift",
    hint: "Gusto ko mag",
    word: "shift",
    hint: " ko mag",
  }
];

input.addEventListener("keyup", userInput);
button.addEventListener("click", nextCard);

function nextCard() {
  try {
    words.splice(randomNumber, 1);
  
    start();
  } catch {
    location.reload();
  }
}
function focusAgain() {
  input.focus();
}

function reset() {
  initialGuess = 5;
  wrongLetters = [];
  boxesContainer.innerHTML = "";
  wrongLettersContainer.textContent = "";
  message.textContent = "";
  subMessage.textContent = "Give it a try!";
  input.value = "";
  input.addEventListener("focusout", focusAgain);
  input.focus();
}

start();
function start() {
  reset();
  randomNumber = Math.floor(Math.random() * words.length);
  const randomWord = words[randomNumber];
  wordLetters = randomWord.word.split("");
  for (let i = 0; i < wordLetters.length; i++) {
    boxesContainer.innerHTML += `<div class="box"></div>`;
  }
  hint.textContent = `Hint: ${randomWord.hint}`;
  remainingGuess.textContent = initialGuess;
  boxes = document.querySelectorAll(".box");
}

function userInput(e) {
  if (e.keyCode <= 64 || event.keyCode >= 91) {
    subMessage.textContent = "Input letters only!";
    return;
  }
  subMessage.textContent = "";

  const lastLetter = input.value[input.value.length - 1].toUpperCase();
  const hasBeenDeclared = wrongLetters.some((letter) => {
    return letter.toUpperCase() == lastLetter;
  });
  if (hasBeenDeclared) {
    inputDisplay.textContent = "";
    message.textContent = "";
    subMessage.textContent = "Its already been declared!";
    return;
  }

  inputDisplay.textContent = `"${lastLetter}"`;

  const isThere = wordLetters.some((letter) => {
    return letter.toUpperCase() == lastLetter;
  });
  const findIndex = wordLetters.reduce((result, letter, index) => {
    if (letter.toUpperCase() == lastLetter) {
      result.push(index);
    }
    return result;
  }, []);
  if (isThere) {
    for (let i = 0; i < findIndex.length; i++) {
      boxes[findIndex[i]].innerHTML = `<p>${lastLetter}</p>`;
    }
    message.textContent = "is Correct!";
    message.style.color = "green";

    const isAllFilledUp = [...boxes].every((box) => {
      return box.children.length === 1;
    });
    if (isAllFilledUp) {
      inputDisplay.textContent = "";
      message.textContent = "gusto ko na mag shift"+"";
      message.style.color = "green";
      button.textContent = "One more the game?";
      input.removeEventListener("focusout", focusAgain);
      input.blur();
    }
  } else {
    message.textContent = "is Wrong!";
    message.style.color = "red";
    initialGuess--;
    remainingGuess.textContent = initialGuess;
    wrongLetters.push(lastLetter);
    wrongLettersContainer.textContent = "";
    for (let i = 0; i < wrongLetters.length; i++) {
      wrongLettersContainer.textContent += `${wrongLetters[i]} `;
    }
  }
  if (initialGuess < 1) {
    inputDisplay.textContent = "";
    message.textContent = "GAME OVER!";
    message.style.color = "red";
    subMessage.textContent = `The word is ${wordLetters
      .join("")
      .toUpperCase()}`;
    button.textContent = "Restart the game?";
    input.removeEventListener("focusout", focusAgain);
    input.blur();
    for (let i = 0; i < boxes.length; i++) {
      boxes[0].innerHTML = "";
    }
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = `<p>${wordLetters[i].toUpperCase()}</p>`;
    }
  }
}
