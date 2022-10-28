export default class Player {
  constructor(cards, turn) {
    this.cards = cards;
    this.turn = turn;
  }

  get sumOfCards() {
    let valuesArr = [];
    this.cards.map((card) => valuesArr.push(card.numberValue));
    let sum = valuesArr.reduce((prev, curr) => prev + curr);
    return sum;
  }

  displayPlayerCards(cardsContainer) {
    for (let i = 0; i < this.cards.length; i++) {
      cardsContainer.appendChild(this.cards[i].displayCard());
    }
  }

  displayPlayerSum(sumContainer) {
    sumContainer.innerText = `Sum: ${this.sumOfCards}`;
  }
}
