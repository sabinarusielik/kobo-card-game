import Deck from "./deck.js";

const mainWrap = document.getElementById("main-wrap");

let playerOneCards, playerTwoCards;

startGame();
function startGame() {
  const deck = new Deck();
  const shuffledDeck = deck.shuffle();

  // Pick first 8 cards and give 4 each player
  const startingCards = shuffledDeck.splice(0, 8);
  playerOneCards = startingCards.slice(0, 4);
  playerTwoCards = startingCards.slice(4, startingCards.length);

  // Display both players cards on screen
  displayPlayersCards(playerOneCards);
  displayPlayersCards(playerTwoCards);

  // Display deck on screen
  const deckRemainingCards = document.createElement("div");
  deckRemainingCards.innerText = shuffledDeck.length;
  mainWrap.appendChild(deckRemainingCards);

  //   console.log(shuffledDeck);
}

function displayPlayersCards(playersCards) {
  for (let i = 0; i < playersCards.length; i++) {
    mainWrap.appendChild(playersCards[i].displayCard());
  }
}
