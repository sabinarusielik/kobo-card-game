export default class Player {
  constructor(cards, sum, turn) {
    this.cards = cards;
    this.sum = sum;
    this.turn = turn;
  }

  displayPlayersCards(parentEl) {
    for (let i = 0; i < this.cards.length; i++) {
      parentEl.appendChild(this.cards[i].displayCard());
    }
  }
}
