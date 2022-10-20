const root = document.getElementById("root");
const heading = document.createElement("h1");
heading.textContent = "Sort numbers in an array without the sort method";
root.appendChild(heading);
const createArrayButton = document.createElement("button");
createArrayButton.textContent = "Create an array";
root.appendChild(createArrayButton);
const sortArraysButton = document.createElement("button");
sortArraysButton.textContent = "Sort the arrays";
const splitArraysButton = document.createElement("button");
root.appendChild(sortArraysButton);
splitArraysButton.textContent =
  "Split the arrays to numbers from 0-30, 31-60 and 61-100";
root.appendChild(splitArraysButton);
let displayArray = document.createElement("div");
displayArray.className = "display-arrays";
root.appendChild(displayArray);
function sum(num1, num2) {
  return num1 + num2;
}
let arrays = [];
createArrayButton.addEventListener("click", () => {
  displayArray.textContent = "";
  let numberArray = [];
  for (let i = 0; i < 100; i++) {
    let num = Math.floor(Math.random(i) * 101);
    numberArray.push(num);
  }

  arrays.push(numberArray);
  for (let k = 0; k < arrays.length; k++) {
    let arrayRender = document.createElement("div");
    arrayRender.textContent = "Array no." + sum(1, k);
    arrayRender.style.border = "1px solid";
    displayArray.appendChild(arrayRender);
    for (let i = 0; i < numberArray.length; i++) {
      let numRender = document.createElement("p");
      numRender.textContent = numberArray[i];
      numRender.style.color = "blue";
      arrayRender.appendChild(numRender);
    }
  }
  console.log(arrays);
});
sortArraysButton.addEventListener("click", () => {
  displayArray.textContent = "";
  for (let i = 0; i < arrays.length; i++) {
    let arrayRender = document.createElement("div");
    arrayRender.textContent = "Array no." + sum(1, i);
    arrayRender.style.border = "1px solid";
    displayArray.appendChild(arrayRender);
    for (let k = 1; k < arrays[i].length; k++) {
      for (let j = 0; j < k; j++) {
        if (arrays[i][k] < arrays[i][j]) {
          let x = arrays[i][k];
          arrays[i][k] = arrays[i][j];
          arrays[i][j] = x;
        }
      }
    }
    for (let x = 0; x < arrays[i].length; x++) {
      let numRender = document.createElement("p");
      numRender.textContent = arrays[i][x];
      numRender.style.color = "blue";
      arrayRender.appendChild(numRender);
    }
  }
  console.log(arrays);
});
splitArraysButton.addEventListener("click", () => {
  displayArray.textContent = "";
  arrays.forEach((array) => {
    let littleArray = [];
    let middleArray = [];
    let bigArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= 30) {
        littleArray.push(array[i]);
      } else if (array[i] > 30 && array[i] <= 60) {
        middleArray.push(array[i]);
      } else {
        bigArray.push(array[i]);
      }
    }
    for (let i = 0; i < littleArray.length; i++) {
      for (let k = 0; k < i; k++) {
        if (littleArray[i] < littleArray[k]) {
          let x = littleArray[i];
          littleArray[i] = littleArray[k];
          littleArray[k] = x;
        }
      }
    }
    for (let i = 0; i < middleArray.length; i++) {
      for (let k = 0; k < i; k++) {
        if (middleArray[i] < middleArray[k]) {
          let x = middleArray[i];
          middleArray[i] = middleArray[k];
          middleArray[k] = x;
        }
      }
    }
    for (let i = 0; i < bigArray.length; i++) {
      for (let k = 0; k < i; k++) {
        if (bigArray[i] < bigArray[k]) {
          let x = bigArray[i];
          bigArray[i] = bigArray[k];
          bigArray[k] = x;
        }
      }
    }

    let littleRender = document.createElement("div");
    littleRender.textContent =
      "Array no." + sum(1, arrays.indexOf(array)) + " nums from 0 to 30";
    littleRender.style.border = "1px solid";
    displayArray.appendChild(littleRender);
    let middleRender = document.createElement("div");
    middleRender.textContent =
      "Array no." + sum(1, arrays.indexOf(array)) + " nums from 31 to 60";
    middleRender.style.border = "1px solid";
    displayArray.appendChild(middleRender);
    let bigRender = document.createElement("div");
    bigRender.textContent =
      "Array no." + sum(1, arrays.indexOf(array)) + " nums from 61 to 100";
    bigRender.style.border = "1px solid";
    displayArray.appendChild(bigRender);
    littleArray.forEach((num) => {
      let numRender = document.createElement("p");
      numRender.textContent = num;
      numRender.style.color = "blue";
      littleRender.appendChild(numRender);
    });
    middleArray.forEach((num) => {
      let numRender = document.createElement("p");
      numRender.textContent = num;
      numRender.style.color = "blue";
      middleRender.appendChild(numRender);
    });
    bigArray.forEach((num) => {
      let numRender = document.createElement("p");
      numRender.textContent = num;
      numRender.style.color = "blue";
      bigRender.appendChild(numRender);
    });
    console.log(littleArray);
    console.log(middleArray);
    console.log(bigArray);
  });
});
