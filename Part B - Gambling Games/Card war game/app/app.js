const root = document.getElementById("root");
const suits = ["Spades", "Clubs", "Diamonds", "Hearts"];
let cardsArray = new Array();
let cardDeck = document.createElement("p");
cardDeck.textContent = "Starting Deck: " + cardsArray.length;
const playButton = document.createElement("button");
root.prepend(playButton);
root.appendChild(cardDeck);
let p1Deck = new Array();
let p2Deck = new Array();
let iterations = 0;
const gameBoard = document.createElement("div");
gameBoard.className = "game-board";
root.appendChild(gameBoard);
let p1Display = document.createElement("div");
let p1Points = document.createElement("p");
p1Display.className = "p1-board";
p1Points.textContent = "Player 1: " + p1Deck.length;
p1Display.appendChild(p1Points);
let p1CardPrint = document.createElement("div");
let p1FirstWarCardPrint = document.createElement("div");
let p1SecondWarCardPrint = document.createElement("div");
let p1ComparedWarCardPrint = document.createElement("div");
let p2Display = document.createElement("div");
let p2Points = document.createElement("p");
p2Display.className = "p2-board";
p2Points.textContent = "Player 2: " + p2Deck.length;
p2Display.appendChild(p2Points);
let p2CardPrint = document.createElement("div");
let p2FirstWarCardPrint = document.createElement("div");
let p2SecondWarCardPrint = document.createElement("div");
let p2ComparedWarCardPrint = document.createElement("div");
gameBoard.appendChild(p1Display);
gameBoard.appendChild(p2Display);
class Cards {
  constructor(num, suit) {
    (this.num = num), (this.suit = suit);
  }
}

while (cardsArray.length < 52) {
  let card = new Cards(
    Math.floor(Math.random() * (14 - 1) + 1),
    suits[Math.floor(Math.random() * suits.length)]
  );

  cardsArray.push(card);
  for (let i = 0; i < cardsArray.length; i++) {
    for (let k = 0; k < cardsArray.length; k++) {
      if (i !== k) {
        if (cardsArray[i].num === cardsArray[k].num) {
          if (cardsArray[i].suit === cardsArray[k].suit) {
            cardsArray.splice(k, 1);
            iterations++;
          }
        }
      }
    }
  }
}
cardDeck.textContent = "Starting Deck: " + cardsArray.length;
let iterationsCounter = document.createElement("p");
iterationsCounter.className = "iterations-counter";
iterationsCounter.textContent =
  "Iterations it took to make the cards deck: " + iterations;
root.prepend(iterationsCounter);
playButton.textContent = "Play";
playButton.addEventListener("click", () => {
  if (cardsArray.length > 0) {
    p1Display.innerHTML = "";
    p2Display.innerHTML = "";
    p1Display.appendChild(p1Points);
    p2Display.appendChild(p2Points);
    let p1Card = cardsArray[0];
    p1CardPrint.className = "card";
    p1CardPrint.textContent = p1Card.num + " " + p1Card.suit;
    p1Display.appendChild(p1CardPrint);
    let p2Card = cardsArray[1];
    p2CardPrint.className = "card";
    p2CardPrint.textContent = p2Card.num + " " + p2Card.suit;
    p2Display.appendChild(p2CardPrint);
    if (p1Card.num > p2Card.num) {
      p1Deck.push(p1Card, p2Card);
      console.log(p1Deck);
      cardsArray.splice(0, 2);
      console.log(cardsArray);
    } else if (p1Card.num < p2Card.num) {
      p2Deck.push(p1Card, p2Card);
      console.log(p2Deck);
      cardsArray.splice(0, 2);
    } else if (p1Card.num === p2Card.num && cardsArray.length >= 8) {
      let p1FirstWarCard = cardsArray[cardsArray.indexOf(p1Card) + 1];
      p1FirstWarCardPrint.className = "card-back";
      p1FirstWarCardPrint.textContent = "backwards-card";
      p1Display.appendChild(p1FirstWarCardPrint);
      let p2FirstWarCard = cardsArray[cardsArray.indexOf(p1FirstWarCard) + 1];
      p2FirstWarCardPrint.className = "card-back";
      p2FirstWarCardPrint.textContent = "backwards-card";
      p2Display.appendChild(p2FirstWarCardPrint);
      let p1SecondWarCard = cardsArray[cardsArray.indexOf(p2FirstWarCard) + 1];
      p1SecondWarCardPrint.className = "card-back";
      p1SecondWarCardPrint.textContent = "backwards-card";
      p1Display.appendChild(p1SecondWarCardPrint);
      let p2SecondWarCard = cardsArray[cardsArray.indexOf(p1SecondWarCard) + 1];
      p2SecondWarCardPrint.className = "card-back";
      p2SecondWarCardPrint.textContent = "backwards-card";
      p2Display.appendChild(p2SecondWarCardPrint);
      let p1ComparedWarCard =
        cardsArray[cardsArray.indexOf(p2SecondWarCard) + 1];
      p1ComparedWarCardPrint.className = "card";
      p1ComparedWarCardPrint.textContent =
        p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
      p1Display.appendChild(p1ComparedWarCardPrint);
      let p2ComparedWarCard =
        cardsArray[cardsArray.indexOf(p1ComparedWarCard) + 1];
      p2ComparedWarCardPrint.className = "card";
      p2ComparedWarCardPrint.textContent =
        p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
      p2Display.appendChild(p2ComparedWarCardPrint);
      if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
        p1Deck.push(
          p1Card,
          p2Card,
          p1FirstWarCard,
          p2FirstWarCard,
          p1SecondWarCard,
          p2SecondWarCard,
          p1ComparedWarCard,
          p2ComparedWarCard
        );
        setTimeout(() => {
          p1FirstWarCardPrint.classList.remove("card-back");
          p1FirstWarCardPrint.classList.add("card");
          p1FirstWarCardPrint.textContent =
            p1FirstWarCard.num + " " + p1FirstWarCard.suit;
          p1SecondWarCardPrint.classList.remove("card-back");
          p1SecondWarCardPrint.classList.add("card");
          p1SecondWarCardPrint.textContent =
            p1SecondWarCard.num + " " + p1SecondWarCard.suit;
          p2FirstWarCardPrint.classList.remove("card-back");
          p2FirstWarCardPrint.classList.add("card");
          p2FirstWarCardPrint.textContent =
            p2FirstWarCard.num + " " + p2FirstWarCard.suit;
          p2SecondWarCardPrint.classList.remove("card-back");
          p2SecondWarCardPrint.classList.add("card");
          p2SecondWarCardPrint.textContent =
            p2SecondWarCard.num + " " + p2SecondWarCard.suit;
        }, 1000);
        cardsArray.splice(0, 8);
        console.log(p1Deck);
        console.log(cardsArray);
      } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
        p2Deck.push(
          p1Card,
          p2Card,
          p1FirstWarCard,
          p2FirstWarCard,
          p1SecondWarCard,
          p2SecondWarCard,
          p1ComparedWarCard,
          p2ComparedWarCard
        );
        setTimeout(() => {
          p1FirstWarCardPrint.classList.remove("card-back");
          p1FirstWarCardPrint.classList.add("card");
          p1FirstWarCardPrint.textContent =
            p1FirstWarCard.num + " " + p1FirstWarCard.suit;
          p1SecondWarCardPrint.classList.remove("card-back");
          p1SecondWarCardPrint.classList.add("card");
          p1SecondWarCardPrint.textContent =
            p1SecondWarCard.num + " " + p1SecondWarCard.suit;
          p2FirstWarCardPrint.classList.remove("card-back");
          p2FirstWarCardPrint.classList.add("card");
          p2FirstWarCardPrint.textContent =
            p2FirstWarCard.num + " " + p2FirstWarCard.suit;
          p2SecondWarCardPrint.classList.remove("card-back");
          p2SecondWarCardPrint.classList.add("card");
          p2SecondWarCardPrint.textContent =
            p2SecondWarCard.num + " " + p2SecondWarCard.suit;
        }, 1000);
        cardsArray.splice(0, 8);
        console.log(p2Deck);
        console.log(cardsArray);
      } else if (
        p1ComparedWarCard.num === p2ComparedWarCard.num &&
        cardsArray.length >= 8
      ) {
        let p1FirstWarCard = cardsArray[cardsArray.indexOf(p1Card) + 1];
        p1FirstWarCardPrint.className = "card-back";
        p1FirstWarCardPrint.textContent = "backwards-card";
        p1Display.appendChild(p1FirstWarCardPrint);
        let p2FirstWarCard = cardsArray[cardsArray.indexOf(p1FirstWarCard) + 1];
        p2FirstWarCardPrint.className = "card-back";
        p2FirstWarCardPrint.textContent = "backwards-card";
        p2Display.appendChild(p2FirstWarCardPrint);
        let p1SecondWarCard =
          cardsArray[cardsArray.indexOf(p2FirstWarCard) + 1];
        p1SecondWarCardPrint.className = "card-back";
        p1SecondWarCardPrint.textContent = "backwards-card";
        p1Display.appendChild(p1SecondWarCardPrint);
        let p2SecondWarCard =
          cardsArray[cardsArray.indexOf(p1SecondWarCard) + 1];
        p2SecondWarCardPrint.className = "card-back";
        p2SecondWarCardPrint.textContent = "backwards-card";
        p2Display.appendChild(p2SecondWarCardPrint);
        let p1ComparedWarCard =
          cardsArray[cardsArray.indexOf(p2SecondWarCard) + 1];
        p1ComparedWarCardPrint.className = "card";
        p1ComparedWarCardPrint.textContent =
          p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
        p1Display.appendChild(p1ComparedWarCardPrint);
        let p2ComparedWarCard =
          cardsArray[cardsArray.indexOf(p1ComparedWarCard) + 1];
        p2ComparedWarCardPrint.className = "card";
        p2ComparedWarCardPrint.textContent =
          p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
        p2Display.appendChild(p2ComparedWarCardPrint);
        if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
          p1Deck.push(
            p1Card,
            p2Card,
            p1FirstWarCard,
            p2FirstWarCard,
            p1SecondWarCard,
            p2SecondWarCard,
            p1ComparedWarCard,
            p2ComparedWarCard
          );
          setTimeout(() => {
            p1FirstWarCardPrint.classList.remove("card-back");
            p1FirstWarCardPrint.classList.add("card");
            p1FirstWarCardPrint.textContent =
              p1FirstWarCard.num + " " + p1FirstWarCard.suit;
            p1SecondWarCardPrint.classList.remove("card-back");
            p1SecondWarCardPrint.classList.add("card");
            p1SecondWarCardPrint.textContent =
              p1SecondWarCard.num + " " + p1SecondWarCard.suit;
            p2FirstWarCardPrint.classList.remove("card-back");
            p2FirstWarCardPrint.classList.add("card");
            p2FirstWarCardPrint.textContent =
              p2FirstWarCard.num + " " + p2FirstWarCard.suit;
            p2SecondWarCardPrint.classList.remove("card-back");
            p2SecondWarCardPrint.classList.add("card");
            p2SecondWarCardPrint.textContent =
              p2SecondWarCard.num + " " + p2SecondWarCard.suit;
          }, 1000);
          cardsArray.splice(0, 8);
          console.log(p1Deck);
          console.log(cardsArray);
        } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
          p2Deck.push(
            p1Card,
            p2Card,
            p1FirstWarCard,
            p2FirstWarCard,
            p1SecondWarCard,
            p2SecondWarCard,
            p1ComparedWarCard,
            p2ComparedWarCard
          );
          setTimeout(() => {
            p1FirstWarCardPrint.classList.remove("card-back");
            p1FirstWarCardPrint.classList.add("card");
            p1FirstWarCardPrint.textContent =
              p1FirstWarCard.num + " " + p1FirstWarCard.suit;
            p1SecondWarCardPrint.classList.remove("card-back");
            p1SecondWarCardPrint.classList.add("card");
            p1SecondWarCardPrint.textContent =
              p1SecondWarCard.num + " " + p1SecondWarCard.suit;
            p2FirstWarCardPrint.classList.remove("card-back");
            p2FirstWarCardPrint.classList.add("card");
            p2FirstWarCardPrint.textContent =
              p2FirstWarCard.num + " " + p2FirstWarCard.suit;
            p2SecondWarCardPrint.classList.remove("card-back");
            p2SecondWarCardPrint.classList.add("card");
            p2SecondWarCardPrint.textContent =
              p2SecondWarCard.num + " " + p2SecondWarCard.suit;
          }, 1000);
          cardsArray.splice(0, 8);
          console.log(p2Deck);
          console.log(cardsArray);
        }
      } else if (
        p1ComparedWarCard.num === p2ComparedWarCard.num &&
        cardsArray.length < 8
      ) {
        let p1FirstWarCard = p1Deck[p1Deck.indexOf(p1Card) + 1];
        p1FirstWarCardPrint.className = "card-back";
        p1FirstWarCardPrint.textContent = "backwards-card";
        p1Display.appendChild(p1FirstWarCardPrint);
        let p2FirstWarCard = p2Deck[p2Deck.indexOf(p2Card) + 1];
        p2FirstWarCardPrint.className = "card-back";
        p2FirstWarCardPrint.textContent = "backwards-card";
        p2Display.appendChild(p2FirstWarCardPrint);
        let p1SecondWarCard = p1Deck[p1Deck.indexOf(p1FirstWarCard) + 1];
        p1SecondWarCardPrint.className = "card-back";
        p1SecondWarCardPrint.textContent = "backwards-card";
        p1Display.appendChild(p1SecondWarCardPrint);
        let p2SecondWarCard = p2Deck[p2Deck.indexOf(p2FirstWarCard) + 1];
        p2SecondWarCardPrint.className = "card-back";
        p2SecondWarCardPrint.textContent = "backwards-card";
        p2Display.appendChild(p2SecondWarCardPrint);
        let p1ComparedWarCard = p1Deck[p1Deck.indexOf(p1SecondWarCard) + 1];
        p1ComparedWarCardPrint.className = "card";
        p1ComparedWarCardPrint.textContent =
          p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
        p1Display.appendChild(p1ComparedWarCardPrint);
        let p2ComparedWarCard = p2Deck[p2Deck.indexOf(p2SecondWarCard) + 1];
        p2ComparedWarCardPrint.className = "card";
        p2ComparedWarCardPrint.textContent =
          p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
        p2Display.appendChild(p2ComparedWarCardPrint);
        if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
          p1Deck.push(
            p1Card,
            p2Card,
            p1FirstWarCard,
            p2FirstWarCard,
            p1SecondWarCard,
            p2SecondWarCard,
            p1ComparedWarCard,
            p2ComparedWarCard
          );
          setTimeout(() => {
            p1FirstWarCardPrint.classList.remove("card-back");
            p1FirstWarCardPrint.classList.add("card");
            p1FirstWarCardPrint.textContent =
              p1FirstWarCard.num + " " + p1FirstWarCard.suit;
            p1SecondWarCardPrint.classList.remove("card-back");
            p1SecondWarCardPrint.classList.add("card");
            p1SecondWarCardPrint.textContent =
              p1SecondWarCard.num + " " + p1SecondWarCard.suit;
            p2FirstWarCardPrint.classList.remove("card-back");
            p2FirstWarCardPrint.classList.add("card");
            p2FirstWarCardPrint.textContent =
              p2FirstWarCard.num + " " + p2FirstWarCard.suit;
            p2SecondWarCardPrint.classList.remove("card-back");
            p2SecondWarCardPrint.classList.add("card");
            p2SecondWarCardPrint.textContent =
              p2SecondWarCard.num + " " + p2SecondWarCard.suit;
          }, 1000);
          p1Deck.splice(0, 4);
          p2Deck.splice(0, 4);
          console.log(p1Deck);
        } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
          p2Deck.push(
            p1Card,
            p2Card,
            p1FirstWarCard,
            p2FirstWarCard,
            p1SecondWarCard,
            p2SecondWarCard,
            p1ComparedWarCard,
            p2ComparedWarCard
          );
          setTimeout(() => {
            p1FirstWarCardPrint.classList.remove("card-back");
            p1FirstWarCardPrint.classList.add("card");
            p1FirstWarCardPrint.textContent =
              p1FirstWarCard.num + " " + p1FirstWarCard.suit;
            p1SecondWarCardPrint.classList.remove("card-back");
            p1SecondWarCardPrint.classList.add("card");
            p1SecondWarCardPrint.textContent =
              p1SecondWarCard.num + " " + p1SecondWarCard.suit;
            p2FirstWarCardPrint.classList.remove("card-back");
            p2FirstWarCardPrint.classList.add("card");
            p2FirstWarCardPrint.textContent =
              p2FirstWarCard.num + " " + p2FirstWarCard.suit;
            p2SecondWarCardPrint.classList.remove("card-back");
            p2SecondWarCardPrint.classList.add("card");
            p2SecondWarCardPrint.textContent =
              p2SecondWarCard.num + " " + p2SecondWarCard.suit;
          }, 1000);
          p1Deck.splice(0, 4);
          p2Deck.splice(0, 4);
        } else if (p1ComparedWarCard.num === p2ComparedWarCard.num) {
          let p1FirstWarCard = p1Deck[p1Deck.indexOf(p1Card) + 1];
          p1FirstWarCardPrint.className = "card-back";
          p1FirstWarCardPrint.textContent = "backwards-card";
          p1Display.appendChild(p1FirstWarCardPrint);
          let p2FirstWarCard = p2Deck[p2Deck.indexOf(p2Card) + 1];
          p2FirstWarCardPrint.className = "card-back";
          p2FirstWarCardPrint.textContent = "backwards-card";
          p2Display.appendChild(p2FirstWarCardPrint);
          let p1SecondWarCard = p1Deck[p1Deck.indexOf(p1FirstWarCard) + 1];
          p1SecondWarCardPrint.className = "card-back";
          p1SecondWarCardPrint.textContent = "backwards-card";
          p1Display.appendChild(p1SecondWarCardPrint);
          let p2SecondWarCard = p2Deck[p2Deck.indexOf(p2FirstWarCard) + 1];
          p2SecondWarCardPrint.className = "card-back";
          p2SecondWarCardPrint.textContent = "backwards-card";
          p2Display.appendChild(p2SecondWarCardPrint);
          let p1ComparedWarCard = p1Deck[p1Deck.indexOf(p1SecondWarCard) + 1];
          p1ComparedWarCardPrint.className = "card";
          p1ComparedWarCardPrint.textContent =
            p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
          p1Display.appendChild(p1ComparedWarCardPrint);
          let p2ComparedWarCard = p2Deck[p2Deck.indexOf(p2SecondWarCard) + 1];
          p2ComparedWarCardPrint.className = "card";
          p2ComparedWarCardPrint.textContent =
            p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
          p2Display.appendChild(p2ComparedWarCardPrint);
          if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
            p1Deck.push(
              p1Card,
              p2Card,
              p1FirstWarCard,
              p2FirstWarCard,
              p1SecondWarCard,
              p2SecondWarCard,
              p1ComparedWarCard,
              p2ComparedWarCard
            );
            setTimeout(() => {
              p1FirstWarCardPrint.classList.remove("card-back");
              p1FirstWarCardPrint.classList.add("card");
              p1FirstWarCardPrint.textContent =
                p1FirstWarCard.num + " " + p1FirstWarCard.suit;
              p1SecondWarCardPrint.classList.remove("card-back");
              p1SecondWarCardPrint.classList.add("card");
              p1SecondWarCardPrint.textContent =
                p1SecondWarCard.num + " " + p1SecondWarCard.suit;
              p2FirstWarCardPrint.classList.remove("card-back");
              p2FirstWarCardPrint.classList.add("card");
              p2FirstWarCardPrint.textContent =
                p2FirstWarCard.num + " " + p2FirstWarCard.suit;
              p2SecondWarCardPrint.classList.remove("card-back");
              p2SecondWarCardPrint.classList.add("card");
              p2SecondWarCardPrint.textContent =
                p2SecondWarCard.num + " " + p2SecondWarCard.suit;
            }, 1000);
            p1Deck.splice(0, 4);
            p2Deck.splice(0, 4);
            console.log(p1Deck);
          } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
            p2Deck.push(
              p1Card,
              p2Card,
              p1FirstWarCard,
              p2FirstWarCard,
              p1SecondWarCard,
              p2SecondWarCard,
              p1ComparedWarCard,
              p2ComparedWarCard
            );
            setTimeout(() => {
              p1FirstWarCardPrint.classList.remove("card-back");
              p1FirstWarCardPrint.classList.add("card");
              p1FirstWarCardPrint.textContent =
                p1FirstWarCard.num + " " + p1FirstWarCard.suit;
              p1SecondWarCardPrint.classList.remove("card-back");
              p1SecondWarCardPrint.classList.add("card");
              p1SecondWarCardPrint.textContent =
                p1SecondWarCard.num + " " + p1SecondWarCard.suit;
              p2FirstWarCardPrint.classList.remove("card-back");
              p2FirstWarCardPrint.classList.add("card");
              p2FirstWarCardPrint.textContent =
                p2FirstWarCard.num + " " + p2FirstWarCard.suit;
              p2SecondWarCardPrint.classList.remove("card-back");
              p2SecondWarCardPrint.classList.add("card");
              p2SecondWarCardPrint.textContent =
                p2SecondWarCard.num + " " + p2SecondWarCard.suit;
            }, 1000);
            p1Deck.splice(0, 4);
            p2Deck.splice(0, 4);
          }
        }
      }
    } else if (p1Card.num === p2Card.num && cardsArray.length < 8) {
      let p1FirstWarCard = p1Deck[p1Deck.indexOf(p1Card) + 1];
      p1FirstWarCardPrint.className = "card-back";
      p1FirstWarCardPrint.textContent = "backwards-card";
      p1Display.appendChild(p1FirstWarCardPrint);
      let p2FirstWarCard = p2Deck[p2Deck.indexOf(p2Card) + 1];
      p2FirstWarCardPrint.className = "card-back";
      p2FirstWarCardPrint.textContent = "backwards-card";
      p2Display.appendChild(p2FirstWarCardPrint);
      let p1SecondWarCard = p1Deck[p1Deck.indexOf(p1FirstWarCard) + 1];
      p1SecondWarCardPrint.className = "card-back";
      p1SecondWarCardPrint.textContent = "backwards-card";
      p1Display.appendChild(p1SecondWarCardPrint);
      let p2SecondWarCard = p2Deck[p2Deck.indexOf(p2FirstWarCard) + 1];
      p2SecondWarCardPrint.className = "card-back";
      p2SecondWarCardPrint.textContent = "backwards-card";
      p2Display.appendChild(p2SecondWarCardPrint);
      let p1ComparedWarCard = p1Deck[p1Deck.indexOf(p1SecondWarCard) + 1];
      p1ComparedWarCardPrint.className = "card";
      p1ComparedWarCardPrint.textContent =
        p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
      p1Display.appendChild(p1ComparedWarCardPrint);
      let p2ComparedWarCard = p2Deck[p2Deck.indexOf(p2SecondWarCard) + 1];
      p2ComparedWarCardPrint.className = "card";
      p2ComparedWarCardPrint.textContent =
        p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
      p2Display.appendChild(p2ComparedWarCardPrint);
      if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
        p1Deck.push(
          p1Card,
          p2Card,
          p1FirstWarCard,
          p2FirstWarCard,
          p1SecondWarCard,
          p2SecondWarCard,
          p1ComparedWarCard,
          p2ComparedWarCard
        );
        setTimeout(() => {
          p1FirstWarCardPrint.classList.remove("card-back");
          p1FirstWarCardPrint.classList.add("card");
          p1FirstWarCardPrint.textContent =
            p1FirstWarCard.num + " " + p1FirstWarCard.suit;
          p1SecondWarCardPrint.classList.remove("card-back");
          p1SecondWarCardPrint.classList.add("card");
          p1SecondWarCardPrint.textContent =
            p1SecondWarCard.num + " " + p1SecondWarCard.suit;
          p2FirstWarCardPrint.classList.remove("card-back");
          p2FirstWarCardPrint.classList.add("card");
          p2FirstWarCardPrint.textContent =
            p2FirstWarCard.num + " " + p2FirstWarCard.suit;
          p2SecondWarCardPrint.classList.remove("card-back");
          p2SecondWarCardPrint.classList.add("card");
          p2SecondWarCardPrint.textContent =
            p2SecondWarCard.num + " " + p2SecondWarCard.suit;
        }, 1000);
        p1Deck.splice(0, 4);
        p2Deck.splice(0, 4);
        console.log(p1Deck);
      } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
        p2Deck.push(
          p1Card,
          p2Card,
          p1FirstWarCard,
          p2FirstWarCard,
          p1SecondWarCard,
          p2SecondWarCard,
          p1ComparedWarCard,
          p2ComparedWarCard
        );
        setTimeout(() => {
          p1FirstWarCardPrint.classList.remove("card-back");
          p1FirstWarCardPrint.classList.add("card");
          p1FirstWarCardPrint.textContent =
            p1FirstWarCard.num + " " + p1FirstWarCard.suit;
          p1SecondWarCardPrint.classList.remove("card-back");
          p1SecondWarCardPrint.classList.add("card");
          p1SecondWarCardPrint.textContent =
            p1SecondWarCard.num + " " + p1SecondWarCard.suit;
          p2FirstWarCardPrint.classList.remove("card-back");
          p2FirstWarCardPrint.classList.add("card");
          p2FirstWarCardPrint.textContent =
            p2FirstWarCard.num + " " + p2FirstWarCard.suit;
          p2SecondWarCardPrint.classList.remove("card-back");
          p2SecondWarCardPrint.classList.add("card");
          p2SecondWarCardPrint.textContent =
            p2SecondWarCard.num + " " + p2SecondWarCard.suit;
        }, 1000);
        p1Deck.splice(0, 4);
        p2Deck.splice(0, 4);
      } else if (p1ComparedWarCard.num === p2ComparedWarCard.num) {
        let p1FirstWarCard = p1Deck[p1Deck.indexOf(p1Card) + 1];
        p1FirstWarCardPrint.className = "card-back";
        p1FirstWarCardPrint.textContent = "backwards-card";
        p1Display.appendChild(p1FirstWarCardPrint);
        let p2FirstWarCard = p2Deck[p2Deck.indexOf(p2Card) + 1];
        p2FirstWarCardPrint.className = "card-back";
        p2FirstWarCardPrint.textContent = "backwards-card";
        p2Display.appendChild(p2FirstWarCardPrint);
        let p1SecondWarCard = p1Deck[p1Deck.indexOf(p1FirstWarCard) + 1];
        p1SecondWarCardPrint.className = "card-back";
        p1SecondWarCardPrint.textContent = "backwards-card";
        p1Display.appendChild(p1SecondWarCardPrint);
        let p2SecondWarCard = p2Deck[p2Deck.indexOf(p2FirstWarCard) + 1];
        p2SecondWarCardPrint.className = "card-back";
        p2SecondWarCardPrint.textContent = "backwards-card";
        p2Display.appendChild(p2SecondWarCardPrint);
        let p1ComparedWarCard = p1Deck[p1Deck.indexOf(p1SecondWarCard) + 1];
        p1ComparedWarCardPrint.className = "card";
        p1ComparedWarCardPrint.textContent =
          p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
        p1Display.appendChild(p1ComparedWarCardPrint);
        let p2ComparedWarCard = p2Deck[p2Deck.indexOf(p2SecondWarCard) + 1];
        p2ComparedWarCardPrint.className = "card";
        p2ComparedWarCardPrint.textContent =
          p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
        p2Display.appendChild(p2ComparedWarCardPrint);
        if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
          p1Deck.push(
            p1Card,
            p2Card,
            p1FirstWarCard,
            p2FirstWarCard,
            p1SecondWarCard,
            p2SecondWarCard,
            p1ComparedWarCard,
            p2ComparedWarCard
          );
          setTimeout(() => {
            p1FirstWarCardPrint.classList.remove("card-back");
            p1FirstWarCardPrint.classList.add("card");
            p1FirstWarCardPrint.textContent =
              p1FirstWarCard.num + " " + p1FirstWarCard.suit;
            p1SecondWarCardPrint.classList.remove("card-back");
            p1SecondWarCardPrint.classList.add("card");
            p1SecondWarCardPrint.textContent =
              p1SecondWarCard.num + " " + p1SecondWarCard.suit;
            p2FirstWarCardPrint.classList.remove("card-back");
            p2FirstWarCardPrint.classList.add("card");
            p2FirstWarCardPrint.textContent =
              p2FirstWarCard.num + " " + p2FirstWarCard.suit;
            p2SecondWarCardPrint.classList.remove("card-back");
            p2SecondWarCardPrint.classList.add("card");
            p2SecondWarCardPrint.textContent =
              p2SecondWarCard.num + " " + p2SecondWarCard.suit;
          }, 1000);
          p1Deck.splice(0, 4);
          p2Deck.splice(0, 4);
          console.log(p1Deck);
        } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
          p2Deck.push(
            p1Card,
            p2Card,
            p1FirstWarCard,
            p2FirstWarCard,
            p1SecondWarCard,
            p2SecondWarCard,
            p1ComparedWarCard,
            p2ComparedWarCard
          );
          setTimeout(() => {
            p1FirstWarCardPrint.classList.remove("card-back");
            p1FirstWarCardPrint.classList.add("card");
            p1FirstWarCardPrint.textContent =
              p1FirstWarCard.num + " " + p1FirstWarCard.suit;
            p1SecondWarCardPrint.classList.remove("card-back");
            p1SecondWarCardPrint.classList.add("card");
            p1SecondWarCardPrint.textContent =
              p1SecondWarCard.num + " " + p1SecondWarCard.suit;
            p2FirstWarCardPrint.classList.remove("card-back");
            p2FirstWarCardPrint.classList.add("card");
            p2FirstWarCardPrint.textContent =
              p2FirstWarCard.num + " " + p2FirstWarCard.suit;
            p2SecondWarCardPrint.classList.remove("card-back");
            p2SecondWarCardPrint.classList.add("card");
            p2SecondWarCardPrint.textContent =
              p2SecondWarCard.num + " " + p2SecondWarCard.suit;
          }, 1000);
          p1Deck.splice(0, 4);
          p2Deck.splice(0, 4);
        }
      }
    }
  } else if (cardsArray.length === 0) {
    p1Display.innerHTML = "";
    p2Display.innerHTML = "";
    p1Display.appendChild(p1Points);
    p2Display.appendChild(p2Points);
    let p1Card = p1Deck[0];
    p1CardPrint.className = "card";
    p1CardPrint.textContent = p1Card.num + " " + p1Card.suit;
    p1Display.appendChild(p1CardPrint);
    let p2Card = p2Deck[0];
    p2CardPrint.className = "card";
    p2CardPrint.textContent = p2Card.num + " " + p2Card.suit;
    p2Display.appendChild(p2CardPrint);
    if (p1Card.num > p2Card.num) {
      p1Deck.push(p1Card, p2Card);
      p1Deck.splice(0, 1);
      p2Deck.splice(0, 1);
    } else if (p1Card.num < p2Card.num) {
      p2Deck.push(p1Card, p2Card);
      p1Deck.splice(0, 1);
      p2Deck.splice(0, 1);
    } else if (p1Card.num === p2Card.num) {
      let p1FirstWarCard = p1Deck[p1Deck.indexOf(p1Card) + 1];
      p1FirstWarCardPrint.className = "card-back";
      p1FirstWarCardPrint.textContent = "backwards-card";
      p1Display.appendChild(p1FirstWarCardPrint);
      let p2FirstWarCard = p2Deck[p2Deck.indexOf(p2Card) + 1];
      p2FirstWarCardPrint.className = "card-back";
      p2FirstWarCardPrint.textContent = "backwards-card";
      p2Display.appendChild(p2FirstWarCardPrint);
      let p1SecondWarCard = p1Deck[p1Deck.indexOf(p1FirstWarCard) + 1];
      p1SecondWarCardPrint.className = "card-back";
      p1SecondWarCardPrint.textContent = "backwards-card";
      p1Display.appendChild(p1SecondWarCardPrint);
      let p2SecondWarCard = p2Deck[p2Deck.indexOf(p2FirstWarCard) + 1];
      p2SecondWarCardPrint.className = "card-back";
      p2SecondWarCardPrint.textContent = "backwards-card";
      p2Display.appendChild(p2SecondWarCardPrint);
      let p1ComparedWarCard = p1Deck[p1Deck.indexOf(p1SecondWarCard) + 1];
      p1ComparedWarCardPrint.className = "card";
      p1ComparedWarCardPrint.textContent =
        p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
      p1Display.appendChild(p1ComparedWarCardPrint);
      let p2ComparedWarCard = p2Deck[p2Deck.indexOf(p2SecondWarCard) + 1];
      p2ComparedWarCardPrint.className = "card";
      p2ComparedWarCardPrint.textContent =
        p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
      p2Display.appendChild(p2ComparedWarCardPrint);
      if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
        p1Deck.push(
          p1Card,
          p2Card,
          p1FirstWarCard,
          p2FirstWarCard,
          p1SecondWarCard,
          p2SecondWarCard,
          p1ComparedWarCard,
          p2ComparedWarCard
        );
        setTimeout(() => {
          p1FirstWarCardPrint.classList.remove("card-back");
          p1FirstWarCardPrint.classList.add("card");
          p1FirstWarCardPrint.textContent =
            p1FirstWarCard.num + " " + p1FirstWarCard.suit;
          p1SecondWarCardPrint.classList.remove("card-back");
          p1SecondWarCardPrint.classList.add("card");
          p1SecondWarCardPrint.textContent =
            p1SecondWarCard.num + " " + p1SecondWarCard.suit;
          p2FirstWarCardPrint.classList.remove("card-back");
          p2FirstWarCardPrint.classList.add("card");
          p2FirstWarCardPrint.textContent =
            p2FirstWarCard.num + " " + p2FirstWarCard.suit;
          p2SecondWarCardPrint.classList.remove("card-back");
          p2SecondWarCardPrint.classList.add("card");
          p2SecondWarCardPrint.textContent =
            p2SecondWarCard.num + " " + p2SecondWarCard.suit;
        }, 1000);
        p1Deck.splice(0, 4);
        p2Deck.splice(0, 4);
        console.log(p1Deck);
      } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
        p2Deck.push(
          p1Card,
          p2Card,
          p1FirstWarCard,
          p2FirstWarCard,
          p1SecondWarCard,
          p2SecondWarCard,
          p1ComparedWarCard,
          p2ComparedWarCard
        );
        setTimeout(() => {
          p1FirstWarCardPrint.classList.remove("card-back");
          p1FirstWarCardPrint.classList.add("card");
          p1FirstWarCardPrint.textContent =
            p1FirstWarCard.num + " " + p1FirstWarCard.suit;
          p1SecondWarCardPrint.classList.remove("card-back");
          p1SecondWarCardPrint.classList.add("card");
          p1SecondWarCardPrint.textContent =
            p1SecondWarCard.num + " " + p1SecondWarCard.suit;
          p2FirstWarCardPrint.classList.remove("card-back");
          p2FirstWarCardPrint.classList.add("card");
          p2FirstWarCardPrint.textContent =
            p2FirstWarCard.num + " " + p2FirstWarCard.suit;
          p2SecondWarCardPrint.classList.remove("card-back");
          p2SecondWarCardPrint.classList.add("card");
          p2SecondWarCardPrint.textContent =
            p2SecondWarCard.num + " " + p2SecondWarCard.suit;
        }, 1000);
        p1Deck.splice(0, 4);
        p2Deck.splice(0, 4);
      } else if (p1ComparedWarCard.num === p2ComparedWarCard.num) {
        if (p1Deck.length >= 4 && p2Deck.length >= 4) {
          let p1FirstWarCard = p1Deck[p1Deck.indexOf(p1Card) + 1];
          p1FirstWarCardPrint.className = "card-back";
          p1FirstWarCardPrint.textContent = "backwards-card";
          p1Display.appendChild(p1FirstWarCardPrint);
          let p2FirstWarCard = p2Deck[p2Deck.indexOf(p2Card) + 1];
          p2FirstWarCardPrint.className = "card-back";
          p2FirstWarCardPrint.textContent = "backwards-card";
          p2Display.appendChild(p2FirstWarCardPrint);
          let p1SecondWarCard = p1Deck[p1Deck.indexOf(p1FirstWarCard) + 1];
          p1SecondWarCardPrint.className = "card-back";
          p1SecondWarCardPrint.textContent = "backwards-card";
          p1Display.appendChild(p1SecondWarCardPrint);
          let p2SecondWarCard = p2Deck[p2Deck.indexOf(p2FirstWarCard) + 1];
          p2SecondWarCardPrint.className = "card-back";
          p2SecondWarCardPrint.textContent = "backwards-card";
          p2Display.appendChild(p2SecondWarCardPrint);
          let p1ComparedWarCard = p1Deck[p1Deck.indexOf(p1SecondWarCard) + 1];
          p1ComparedWarCardPrint.className = "card";
          p1ComparedWarCardPrint.textContent =
            p1ComparedWarCard.num + " " + p1ComparedWarCard.suit;
          p1Display.appendChild(p1ComparedWarCardPrint);
          let p2ComparedWarCard = p2Deck[p2Deck.indexOf(p2SecondWarCard) + 1];
          p2ComparedWarCardPrint.className = "card";
          p2ComparedWarCardPrint.textContent =
            p2ComparedWarCard.num + " " + p2ComparedWarCard.suit;
          p2Display.appendChild(p2ComparedWarCardPrint);
          if (p1ComparedWarCard.num > p2ComparedWarCard.num) {
            p1Deck.push(
              p1Card,
              p2Card,
              p1FirstWarCard,
              p2FirstWarCard,
              p1SecondWarCard,
              p2SecondWarCard,
              p1ComparedWarCard,
              p2ComparedWarCard
            );
            setTimeout(() => {
              p1FirstWarCardPrint.classList.remove("card-back");
              p1FirstWarCardPrint.classList.add("card");
              p1FirstWarCardPrint.textContent =
                p1FirstWarCard.num + " " + p1FirstWarCard.suit;
              p1SecondWarCardPrint.classList.remove("card-back");
              p1SecondWarCardPrint.classList.add("card");
              p1SecondWarCardPrint.textContent =
                p1SecondWarCard.num + " " + p1SecondWarCard.suit;
              p2FirstWarCardPrint.classList.remove("card-back");
              p2FirstWarCardPrint.classList.add("card");
              p2FirstWarCardPrint.textContent =
                p2FirstWarCard.num + " " + p2FirstWarCard.suit;
              p2SecondWarCardPrint.classList.remove("card-back");
              p2SecondWarCardPrint.classList.add("card");
              p2SecondWarCardPrint.textContent =
                p2SecondWarCard.num + " " + p2SecondWarCard.suit;
            }, 1000);
            p1Deck.splice(0, 4);
            p2Deck.splice(0, 4);
            console.log(p1Deck);
          } else if (p1ComparedWarCard.num < p2ComparedWarCard.num) {
            p2Deck.push(
              p1Card,
              p2Card,
              p1FirstWarCard,
              p2FirstWarCard,
              p1SecondWarCard,
              p2SecondWarCard,
              p1ComparedWarCard,
              p2ComparedWarCard
            );
            setTimeout(() => {
              p1FirstWarCardPrint.classList.remove("card-back");
              p1FirstWarCardPrint.classList.add("card");
              p1FirstWarCardPrint.textContent =
                p1FirstWarCard.num + " " + p1FirstWarCard.suit;
              p1SecondWarCardPrint.classList.remove("card-back");
              p1SecondWarCardPrint.classList.add("card");
              p1SecondWarCardPrint.textContent =
                p1SecondWarCard.num + " " + p1SecondWarCard.suit;
              p2FirstWarCardPrint.classList.remove("card-back");
              p2FirstWarCardPrint.classList.add("card");
              p2FirstWarCardPrint.textContent =
                p2FirstWarCard.num + " " + p2FirstWarCard.suit;
              p2SecondWarCardPrint.classList.remove("card-back");
              p2SecondWarCardPrint.classList.add("card");
              p2SecondWarCardPrint.textContent =
                p2SecondWarCard.num + " " + p2SecondWarCard.suit;
            }, 1000);
            p1Deck.splice(0, 4);
            p2Deck.splice(0, 4);
          }
        }
      } else if (p1Deck.length < 4) {
        let winner = document.createElement("p");
        winner.textContent =
          "Player 2 is the winner!!! Player 1 doesn't have enough cards for war! to reset the game refresh the page";
        root.appendChild(winner);
        root.removeChild(playButton);
      } else if (p2Deck.length < 4) {
        let winner = document.createElement("p");
        winner.textContent =
          "Player 2 is the winner!!! Player 1 doesn't have enough cards for war! to reset the game refresh the page";
        root.appendChild(winner);
        root.removeChild(playButton);
      }
    } else if (p1Deck.length < 4) {
      let winner = document.createElement("p");
      winner.textContent =
        "Player 2 is the winner!!! Player 1 doesn't have enough cards for war! to reset the game refresh the page";
      root.appendChild(winner);
      root.removeChild(playButton);
    } else if (p2Deck.length < 4) {
      let winner = document.createElement("p");
      winner.textContent =
        "Player 2 is the winner!!! Player 1 doesn't have enough cards for war! to reset the game refresh the page";
      root.appendChild(winner);
      root.removeChild(playButton);
    }
  }
  if (cardsArray.length === 0 && p2Deck.length === 0) {
    let winner = document.createElement("p");
    winner.textContent =
      "Player 1 is the winner!!! to reset the game refresh the page";
    root.appendChild(winner);
    root.removeChild(playButton);
  } else if (cardsArray.length === 0 && p1Deck.length === 0) {
    let winner = document.createElement("p");
    winner.textContent =
      "Player 2 is the winner!!! to reset the game refresh the page";
    root.appendChild(winner);
    root.removeChild(playButton);
  }
  p1Points.textContent = "Player 1: " + p1Deck.length;
  p2Points.textContent = "Player 2: " + p2Deck.length;
  cardDeck.textContent = "Starting Deck: " + cardsArray.length;
});
