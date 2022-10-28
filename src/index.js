import Deck from "./deck.js";
import Player from "./player.js";

const mainWrap = document.getElementById("main-wrap");
const playerOneContainer = document.querySelector(".player-one-container");
const playerTwoContainer = document.querySelector(".player-two-container");
const deckRemainingCards = document.querySelector(".deck");

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
  playerOneContainer.appendChild(displayPlayerCards(playerOne));
  playerTwoContainer.appendChild(displayPlayerCards(playerTwo));

  // Display both players sums on screen
  playerOneContainer.appendChild(displayPlayerSum(playerOne));
  playerTwoContainer.appendChild(displayPlayerSum(playerTwo));

  // Display deck remaining cards on screen
  deckRemainingCards.innerText = `Remaining cards: ${shuffledDeck.length}`;
}

function displayPlayerCards(player) {
  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-container");
  for (let i = 0; i < player.cards.length; i++) {
    cardsContainer.appendChild(player.cards[i].displayCard());
  }
  return cardsContainer;
}

function displayPlayerSum(player) {
  const sumCard = document.createElement("div");
  sumCard.classList.add("sum-card", "card", "flex-center");
  sumCard.innerText = `Sum: ${player.sumOfCards}`;
  return sumCard;
}

console.log(playerOne, playerTwo);
console.log(playerOne.sumOfCards, playerTwo.sumOfCards);

// const playerOneWrap = document.querySelectorAll(".player-container")[0];
// const playerTwoWrap = document.querySelectorAll(".player-container")[1];
// const playerOneCardsWrap = playerOneWrap.firstElementChild;
// const playerTwoCardsWrap = playerTwoWrap.firstElementChild;

// Flip 2 cards of choice
// function updatePlayerDisplay(n) {
//   playerOneCardsWrap.innerHTML = "";
//   playerOne.cards[n].changeFlip();
//   for (let i = 0; i < playerOne.cards.length; i++) {
//     playerOneCardsWrap.appendChild(playerOne.cards[i].displayCard());
//   }
// }

// updatePlayerDisplay(0);
