import Deck from "./deck.js";
import Player from "./player.js";

const mainWrap = document.getElementById("main-wrap");
const playerOneContainer = document.querySelector(".player-one-container");
const playerTwoContainer = document.querySelector(".player-two-container");
const playerOneCardsContainer = document.querySelector(
  ".player-one-container .cards-container"
);
const playerTwoCardsContainer = document.querySelector(
  ".player-two-container .cards-container"
);
const playerOneSumContainer = document.querySelector(
  ".player-one-container .sum-card"
);
const playerTwoSumContainer = document.querySelector(
  ".player-two-container .sum-card"
);
const deckRemainingCards = document.querySelector(".deck");

let playerOne, playerTwo;

let flipCount = 0;

// document.addEventListener("click", () => {
//   console.log("Document");
//   checkForTurn();
// });

startGame();
function startGame() {
  const deck = new Deck();
  const shuffledDeck = deck.shuffle();

  // Pick first 8 cards and give 4 each player
  const startingCards = shuffledDeck.splice(0, 8);
  let playerOneCards = startingCards.slice(0, 4);
  let playerTwoCards = startingCards.slice(4, startingCards.length);

  // Create 2 players and their decks
  playerOne = new Player(playerOneCards, true);
  playerTwo = new Player(playerTwoCards, false);

  // Display both players cards on screen
  playerOne.displayPlayerCards(playerOneCardsContainer);
  playerTwo.displayPlayerCards(playerTwoCardsContainer);

  // Display both players sums on screen
  playerOne.displayPlayerSum(playerOneSumContainer);
  playerTwo.displayPlayerSum(playerTwoSumContainer);

  // Display deck remaining cards on screen
  deckRemainingCards.innerText = `Remaining cards: ${shuffledDeck.length}`;

  // Start first round
  playerOneCardsContainer.addEventListener("click", firstCardFlip);
}

// Checks whose turn it is
// function checkForTurn() {
//   if (playerOne.turn) {
//     playerOneCardsContainer.addEventListener("click", firstCardFlip);
//     playerTwoCardsContainer.removeEventListener("click", firstCardFlip);
//   } else {
//     playerTwoCardsContainer.addEventListener("click", firstCardFlip);
//     playerOneCardsContainer.removeEventListener("click", firstCardFlip);
//   }
// }

// Flip 2 cards of choice and flip back after 2s
function firstCardFlip(e) {
  // Add 1 to flip count
  flipCount += 1;

  // Check if user clicked on card
  if (e.target.classList.contains("cards-container")) {
    return;
  }

  // Check if card is black or red
  const chosenCard = e.target.dataset.value;
  const color =
    chosenCard[0] === "♥" || chosenCard[0] === "♦" ? "red" : "black";

  // Change classes to display front of card
  e.target.classList.remove("card-back");
  e.target.classList.add("flex-center", color);

  // Flip the card back after 2 seconds
  setTimeout(() => {
    e.target.classList.remove("flex-center", color);
    e.target.classList.add("card-back");
  }, "2000");

  // Let the second player check their cards
  if (flipCount >= 2 && flipCount < 4) {
    playerOneCardsContainer.removeEventListener("click", firstCardFlip);
    playerTwoCardsContainer.addEventListener("click", firstCardFlip);
  } else {
    playerTwoCardsContainer.removeEventListener("click", firstCardFlip);
  }
}

console.log(playerOne, playerTwo);
console.log(playerOne.sumOfCards, playerTwo.sumOfCards);
