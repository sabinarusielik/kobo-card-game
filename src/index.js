import Deck from "./deck.js";
import Player from "./player.js";

const mainWrap = document.getElementById("main-wrap");

let playerOne, playerTwo;

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
  playerOne.displayPlayer(mainWrap);
  playerTwo.displayPlayer(mainWrap);

  // Display deck on screen
  const deckRemainingCards = document.createElement("div");
  deckRemainingCards.innerText = `Remaining cards: ${shuffledDeck.length}`;
  deckRemainingCards.classList.add("deck", "flex-center");
  mainWrap.appendChild(deckRemainingCards);
}

console.log(playerOne, playerTwo);
console.log(playerOne.sumOfCards, playerTwo.sumOfCards);

// Flip 2 cards of choice

// const playerOneWrap = document.querySelectorAll(".cards-container")[0];
// const playerTwoWrap = document.querySelectorAll(".cards-container")[1];
// console.log(playerOneWrap, playerTwoWrap);

// playerOneWrap.addEventListener("click", flipCard);
// playerTwoWrap.addEventListener("click", flipCard);

// function flipCard(e) {
//   const card = e.target;
//   card.style.border = "5px solid yellow";
// }
