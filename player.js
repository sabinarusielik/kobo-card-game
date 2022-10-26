export default class Player {
  constructor(cards, turn) {
    this.cards = cards;
    this.turn = turn;
  }

  displayPlayersCards(parentEl) {
    for (let i = 0; i < this.cards.length; i++) {
      parentEl.appendChild(this.cards[i].displayCard());
    }
  }

  get sumOfCards() {
    let valuesArr = [];
    this.cards.map((card) => valuesArr.push(card.numberValue));
    let sum = valuesArr.reduce((prev, curr) => prev + curr);
    return sum;
  }
}
