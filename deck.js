const SUITS = ["♥", "♦", "♣", "♠"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = createDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  shuffle() {
    let n = this.numberOfCards;
    let oldIndex;
    let newIndex;

    while (n) {
      newIndex = Math.floor(Math.random() * n--);
      oldIndex = this.cards[n];
      this.cards[n] = this.cards[newIndex];
      this.cards[newIndex] = oldIndex;
    }
    return this.cards;
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

function createDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
