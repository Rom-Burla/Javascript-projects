let myDiv = document.getElementById("root");
const arrShapes = ["speed", "dimond", "heart", "club"];
let arrCards = new Array();
let counter = 0;
let myBtn = document.createElement("button");
document.body.appendChild(myBtn);
let sortedDeck = document.createElement("div");
document.body.appendChild(sortedDeck);
sortedDeck.id = "sorted-deck";
let compareArr = [];

myBtn.textContent = "Click here to display your deck";
class Cards {
  constructor(num, suit) {
    (this.num = num), (this.suit = suit);
  }
  printCard() {
    let card = document.createElement("div");
    card.className = "card";
    card.id = this.num;
    card.textContent = this.num + " " + this.suit;
    myDiv.appendChild(card);
  }
  printSorted() {
    let card = document.createElement("div");
    card.className = "card";
    card.id = this.num;
    card.textContent = this.num + " " + this.suit;
    sortedDeck.appendChild(card);
  }
  static cardCompare(firstChoice, secondChoice) {
    if (firstChoice > secondChoice) {
      return firstChoice;
    } else if (secondChoice > firstChoice) {
      return secondChoice;
    } else if (firstChoice === secondChoice) {
      return "Cards are equal";
    }
  }
}

while (arrCards.length < 52) {
  let oneCard = new Cards(
    Math.floor(Math.random() * (14 - 1) + 1),
    arrShapes[Math.floor(Math.random() * arrShapes.length)]
  );

  arrCards.push(oneCard);

  for (let r = 0; r < arrCards.length; r++) {
    for (let j = 0; j < arrCards.length; j++) {
      if (r !== j) {
        if (arrCards[r].num === arrCards[j].num) {
          if (arrCards[r].suit === arrCards[j].suit) {
            arrCards.splice(j, 1);
            counter++;
          }
        }
      }
    }
  }
  if (arrCards.length === 52) {
    myBtn.addEventListener("click", () => {
      for (let i = 0; i < arrCards.length; i++) {
        arrCards[i].printCard();
      }
      myDiv.innerHTML += `<div class = "counter">iteritions: ${counter}</div>`;
      let greaterCard = document.createElement("div");
      myDiv.appendChild(greaterCard);
      greaterCard.style.margin = "20px";
      greaterCard.textContent = `Select 2 cards from the not sorted deck and press 
      the "Compare Button" to compare them`;
      let compareBtn = document.createElement("button");
      myDiv.appendChild(compareBtn);
      compareBtn.style.margin = "20px";
      compareBtn.textContent = "Compare Button";
      compareBtn.addEventListener("click", () => {
        let greatCard = Cards.cardCompare(
          parseInt(compareArr[1].id),
          parseInt(compareArr[0].id)
        );
        greaterCard.innerHTML = `The card with the greater value: ${greatCard}`;
      });

      myBtn.style.display = "none";
      let sortBtn = document.createElement("button");
      myDiv.appendChild(sortBtn);
      sortBtn.textContent = "Click this button to sort your Deck by numbers";
      sortBtn.style.margin = "20px";
      sortBtn.addEventListener("click", () => {
        arrCards.sort((a, b) => a.num - b.num);
        for (let i = 0; i < arrCards.length; i++) {
          arrCards[i].printSorted();
        }
      });
    });
    break;
  }
}

myDiv.addEventListener("click", (event) => {
  if (event.target.className === "card") {
    event.target.className = "card-back";
    if (compareArr.length < 2) {
      compareArr.push(event.target);
      console.log(compareArr[0]);
      console.log(compareArr[1]);
    } else if (compareArr.length === 2) {
      compareArr.splice(0, 2);
      compareArr.push(event.target);
    }
  } else if (event.target.className === "card-back") {
    event.target.className = "card";
  }
});
console.log(arrCards);
