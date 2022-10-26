export default class Player {
  constructor(cards, turn) {
    this.cards = cards;
    this.turn = turn;
  }

  displayPlayersCards(parentEl) {
    const container = document.createElement("div");
    container.classList.add("card-container");
    for (let i = 0; i < this.cards.length; i++) {
      container.appendChild(this.cards[i].displayCard());
    }
    parentEl.appendChild(container);
  }

  get sumOfCards() {
    let valuesArr = [];
    this.cards.map((card) => valuesArr.push(card.numberValue));
    let sum = valuesArr.reduce((prev, curr) => prev + curr);
    return sum;
  }
}
