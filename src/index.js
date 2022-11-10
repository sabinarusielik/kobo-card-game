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
const deckRemainingCards = document.querySelector(".deck-remaining");
const deckDrawnCard = document.querySelector(".player-action .deck-drawn");
const deckRejectedCard = document.querySelector(".deck-rejected");

const rejectBtn = document.getElementById("reject-btn");
const replaceBtn = document.getElementById("replace-btn");

const playersWrap = document.querySelector(".players-wrap");

let deck,
  drawnCardContainer,
  rejectedCardsContainer = [];

let playerOne, playerTwo;

let flipCount;

// Connect all
// document.addEventListener("click", () => {
//   console.log("Document");
//   checkForTurn();
// });

startGame();
function startGame() {
  deck = new Deck();
  deck.shuffle();

  // Pick first 8 cards and give 4 each player
  const startingCards = deck.cards.splice(0, 8);
  let playerOneCards = startingCards.slice(0, 4);
  let playerTwoCards = startingCards.slice(4, startingCards.length);

  // Create 2 players and their decks
  playerOne = new Player(playerOneCards, true);
  playerTwo = new Player(playerTwoCards, false);

  // Display both players cards on screen
  playerOne.displayPlayerCards(playerOneCardsContainer);
  playerTwo.displayPlayerCards(playerTwoCardsContainer);

  // Set flipCount to 0
  flipCount = 0;

  // Start first round
  playerOneCardsContainer.addEventListener("click", firstCardFlip);
}

// Flip 2 cards of choice and flip back after 2s
function firstCardFlip(e) {
  // Check if user clicked on card
  if (e.target.classList.contains("cards-container")) {
    return;
  }

  // Add 1 to flip count
  flipCount += 1;

  // Check if card is black or red
  const chosenCard = e.target.dataset.suit;
  const color = chosenCard === "♥" || chosenCard === "♦" ? "red" : "black";

  // Change classes to display front of card
  e.target.classList.remove("card-back");
  e.target.classList.add(color);

  // Flip the card back after 2 seconds
  setTimeout(() => {
    e.target.classList.remove(color);
    e.target.classList.add("card-back");
  }, "2000");

  // Let the second player check their cards
  if (flipCount >= 2 && flipCount < 4) {
    playerOneCardsContainer.removeEventListener("click", firstCardFlip);
    playerTwoCardsContainer.addEventListener("click", firstCardFlip);
    setTimeout(() => {
      playersWrap.style.alignContent = "end";
    }, "2000");
  } else if (flipCount === 4) {
    playerTwoCardsContainer.removeEventListener("click", firstCardFlip);
    deckRemainingCards.addEventListener("click", drawCardFromDeck);
    setTimeout(() => {
      playersWrap.style.alignContent = "start";
    }, "2000");
  }
}

// Draw card from deck
function drawCardFromDeck() {
  // Use draw method from Deck class
  const drawnCard = deck.draw();
  drawnCardContainer = drawnCard;

  // Display drawn card on drawn deck
  displayCardOnDrawnDeck();

  // Listen for action on drawn card
  rejectBtn.addEventListener("click", rejectCard);
  replaceBtn.addEventListener("click", replaceCard);
}

// Display drawn card on drawn deck
function displayCardOnDrawnDeck() {
  // Display drawn card and style it
  const displayCard = drawnCardContainer.displayCard();
  const color = drawnCardContainer.suitColor;
  displayCard.classList.remove("card-back");
  displayCard.classList.add(color);

  // Reset wrap for newly drawn card and append card
  deckDrawnCard.innerHTML = "";
  deckDrawnCard.appendChild(displayCard);
}

function clearDrawnDeckToDisabled() {
  deckDrawnCard.innerHTML = "";
  deckDrawnCard.innerHTML = `<div class="card disabled"></div>`;
}

// Displays top card on rejected deck
function displayCardOnRejectedDeck() {
  // Display rejected card and style it
  const displayCard = rejectedCardsContainer[0].displayCard(0);
  const color = rejectedCardsContainer[0].suitColor;
  displayCard.classList.remove("card-back");
  displayCard.classList.add(color);

  // Reset wrap for container and append card
  deckRejectedCard.removeChild(deckRejectedCard.lastElementChild);
  deckRejectedCard.appendChild(displayCard);
}

// Replace own card with drawn one (from remaining deck)
function replaceCard() {
  // Check if there is drawn card in drawn card deck
  if (deckDrawnCard.firstElementChild.classList.contains("disabled")) {
    return;
  }

  // Replace card with index 0
  const replacedCardArr = playerOne.cards.splice(0, 1, drawnCardContainer);
  const replacedCard = replacedCardArr[0];

  // Update player cards DOM
  playerOne.displayPlayerCards(playerOneCardsContainer);

  // Reject replaced card to the top of array
  rejectedCardsContainer.unshift(replacedCard);

  // Display rejected card and style it
  displayCardOnRejectedDeck();

  clearDrawnDeckToDisabled();

  console.log(rejectedCardsContainer);
}

// Reject drawn card
function rejectCard() {
  console.log("Reject card");
  rejectedCardsContainer.unshift(drawnCardContainer);

  displayCardOnRejectedDeck();

  clearDrawnDeckToDisabled();

  console.log(rejectedCardsContainer);
}

// Replace own card with drawn one (from rejected deck)

// Reject card with same value - regardless of turn
function rejectSameValue() {
  console.log("Reject same value");
}
