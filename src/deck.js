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
    this.numberValue = assignValue(value, suit);
    this.flipped = false;
  }

  get suitColor() {
    return this.suit === "♥" || this.suit === "♦" ? "red" : "black";
  }

  displayCard() {
    const card = document.createElement("div");
    card.innerText = this.suit + this.value;
    card.dataset.value = this.suit + this.value;
    if (this.flipped) {
      card.classList.add("card", "flex-center", this.suitColor);
    } else {
      card.classList.add("card", "card-back");
    }
    return card;
  }
}

function createDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

function assignValue(value, suit) {
  let outcome = Number(value) ? Number(value) : value;
  if (typeof outcome === "number") {
    return outcome;
  } else if (outcome === "A") {
    return 1;
  } else if (outcome === "J") {
    return 11;
  } else if (outcome === "Q") {
    return 12;
  } else if (outcome === "K" && (suit === "♥" || suit === "♦")) {
    return 0;
  } else if (outcome === "K") {
    return 13;
  }
}
