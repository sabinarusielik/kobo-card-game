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

  displayPlayersCards(parentEl) {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-container");
    const container = document.createElement("div");
    container.classList.add("cards-container");
    for (let i = 0; i < this.cards.length; i++) {
      container.appendChild(this.cards[i].displayCard());
    }
    const sumCard = document.createElement("div");
    sumCard.innerText = `Sum: ${this.sumOfCards}`;
    sumCard.classList.add("sum-card", "card", "flex-center");
    playerContainer.appendChild(container);
    playerContainer.appendChild(sumCard);
    parentEl.appendChild(playerContainer);
  }
}
