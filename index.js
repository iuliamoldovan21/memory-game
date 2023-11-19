const cards = document.querySelectorAll(".memory-card");
const timerElement = document.getElementById("timer");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function addTimer() {
  const currentMoment = moment();

  //modify newMoment to define game time
  const newMoment = currentMoment.clone().add(60, "seconds");
  let timeLeft = newMoment.diff(currentMoment, "seconds");

  const timeValue = document.createTextNode(`Seconds left: ${timeLeft}`);
  timerElement.appendChild(timeValue);

  const countdown = setInterval(() => {
    timerElement.innerHTML = `Seconds left: ${timeLeft}`;
    console.log(timeLeft);
    timeLeft -= 1;
    if (timeLeft < 0) {
      clearInterval(countdown);
      timerElement.innerHTML = `TIME EXPIRED!`;
      resetGame();
    }
  }, 1000);
}

function resetGame() {
  setTimeout(() => {
    unflipCards();
    timerElement.innerHTML = "";
    addTimer();
  }, 3000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // prevent double click on the same card to lock the card
  this.classList.add("flip");

  if (!hasFlippedCard) {
    //fist click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;

  //check if cards match
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    //resetBoard();
  }, 1500);
}

(function shuffle() {
  addTimer();
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
