import { vipArr } from "./vipObj.js";
let elem = document.getElementById("root");
class vipPeople {
  constructor(flag, name, worth, source, image) {
    this.flag = flag;
    this.name = name;
    this.worth = worth;
    this.source = source;
    this.image = image;
  }
  displayVip() {
    let person = document.createElement("div");
    elem.appendChild(person);
    person.id = this.name;
    person.classList = "vip";
    person.innerHTML = `<p>Name: ${this.name}<br>Worth: ${this.worth}<br>Source of Wealth: ${this.source}<br><img src="${this.image}" alt="${this.name}"></p>`;
    person.addEventListener("click", () => {
      if (person.id === this.name) {
        this.flag = 1;
        richArr = richArr.filter((vipPerson) => vipPerson.flag < 1);
        if (!richArr.includes(this)) {
          person.style.display = "none";
          console.log(richArr);
        }
      }
    });
  }
}

let richArr = vipArr.map(
  (vipPerson) =>
    new vipPeople(
      vipPerson.flag,
      vipPerson.name,
      vipPerson.worth,
      vipPerson.source,
      vipPerson.image
    )
);

richArr.map((vipPerson) => {
  vipPerson.displayVip();
});
// let person = elem.getElementsByClassName("vip");
// for (let i = 0; i < richArr.length; i++) {
//   person[i].addEventListener("click", () => {
//     delete richArr[i];
//     console.log(richArr);
//   });
// }
