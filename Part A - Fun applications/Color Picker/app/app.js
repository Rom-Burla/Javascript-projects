let root = document.getElementById("root");
let appHeading = document.createElement("h1");
appHeading.className = "app-heading";
appHeading.textContent = "Color Picker";
root.appendChild(appHeading);
let appInstruction = document.createElement("p");
appInstruction.textContent =
  "Write RGB values from 0 - 255 if the value exceeds 255 it replaces itself with 255 if the value is bellow 0 it replaces itself with 0";
root.appendChild(appInstruction);
let form = document.createElement("form");
form.method = "get";
root.appendChild(form);
let firstColor = {};
let secondColor = {};
let favouriteColorArr = [];

// RGB input creation loop + validations
for (let i = 0; i < 3; i++) {
  let inputDiv = document.createElement("div");
  inputDiv.className = "input-div";
  let label = document.createElement("label");
  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Write a value for ";
  if (i === 0) {
    label.setAttribute("for", "R");
    label.textContent = "R";
    input.placeholder += "R";
    input.name = "R";
    input.id = "R";
  } else if (i === 1) {
    label.setAttribute("for", "G");
    label.textContent = "G";
    input.placeholder += "G";
    input.name = "G";
    input.id = "G";
  } else if (i === 2) {
    label.setAttribute("for", "B");
    label.textContent = "B";
    input.placeholder += "B";
    input.name = "B";
    input.id = "B";
  }
  input.addEventListener("keypress", (evt) => {
    let maxLength = 2;
    if (input.value.length > maxLength) {
      input.value.substring(0, maxLength);
      evt.preventDefault();
    }
    input.addEventListener("change", () => {
      if (input.value > 255) {
        input.value = input.value.replace(input.value, 255);
      } else if (input.value < 0) {
        input.value = input.value.replace(input.value, 0);
      }
    });
  });
  inputDiv.appendChild(label);
  inputDiv.appendChild(input);
  form.appendChild(inputDiv);
}
let R = document.getElementById("R");
let G = document.getElementById("G");
let B = document.getElementById("B");
//end of RGB input creation + validation

// color btn and display Divs creation
let firstColorBtn = document.createElement("button");
firstColorBtn.textContent = "create your color";
form.appendChild(firstColorBtn);
let colorDisplays = document.createElement("div");
colorDisplays.className = "color-displays";
root.appendChild(colorDisplays);
let displayFirstColor = document.createElement("div");
displayFirstColor.className = "display-color";
colorDisplays.appendChild(displayFirstColor);
let firstColorForm = document.createElement("div");
firstColorForm.className = "first-color-form";
let secondColorBtn = document.createElement("button");
secondColorBtn.textContent = "create you second color";
let displaySecondColor = document.createElement("div");
displaySecondColor.className = "display-color";
colorDisplays.appendChild(displaySecondColor);
let secondColorForm = document.createElement("div");
secondColorForm.className = "second-color-form";
// end of color btn and display Divs creation

// rgb to hex Button creation
let rgbToHexBtn = document.createElement("button");
rgbToHexBtn.textContent = "Turn RGB to Hex and Hex to RGB";
colorDisplays.appendChild(rgbToHexBtn);
rgbToHexBtn.style.display = "none";

// end of rgb to hex Button creation

// nickname input and favourite first color button creation
let firstColorNicknameLabel = document.createElement("label");
firstColorNicknameLabel.setAttribute("for", "first-color-nickname");
firstColorNicknameLabel.textContent = "Give a nickname to your 1st color";
let firstColorNickname = document.createElement("input");
firstColorNickname.type = "text";
firstColorNickname.name = "first-color-nickname";
firstColorNickname.id = "first-color-nickname";
firstColorNickname.placeholder = "Color nickname";

let favouriteFirstColorBtn = document.createElement("button");
favouriteFirstColorBtn.textContent = "Add first color to favourites";
// nickname input and favourite first color button creation

// first color btn click event
firstColorBtn.addEventListener("click", (evt) => {
  // RGB input not empty validation
  if (R.value === "") {
    alert("You Have to give a value to Red");
  } else if (G.value === "") {
    alert("You Have to give a value to Green");
  } else if (B.value === "") {
    alert("You Have to give a value to Blue");
  } else {
    firstColor = {
      R: Number(R.value),
      G: Number(G.value),
      B: Number(B.value),
    };
    // end of RGB input not empty validation

    R.value = "";
    G.value = "";
    B.value = "";

    // RGB color display
    displayFirstColor.style.backgroundColor = `rgb(${firstColor.R}, ${firstColor.G}, ${firstColor.B})`;
    displayFirstColor.innerHTML = `<p>R:${firstColor.R} G:${firstColor.G} B:${firstColor.B}</p>`;
    displayFirstColor.style.color = `rgb(${firstColor.G}, ${firstColor.B}, ${firstColor.R})`;
    // end of RGB color display

    // RGB to hex button display and event
    rgbToHexBtn.style.display = "block";
    rgbToHexBtn.addEventListener("click", () => {
      // display color in hex variable
      let hexDisplay =
        "<p>" +
        "#" +
        ((1 << 24) + (firstColor.R << 16) + (firstColor.G << 8) + firstColor.B)
          .toString(16)
          .slice(1) +
        "</p>";
      // end of display color in hex variable

      // display color in RGB variable
      let rgbDisplay = `<p>R:${firstColor.R} G:${firstColor.G} B:${firstColor.B}</p>`;
      // end of display color in RGB variable

      // conditions for when to display in RGB and when to display in hex
      if (displayFirstColor.innerHTML === rgbDisplay) {
        displayFirstColor.innerHTML = hexDisplay;
      } else if (displayFirstColor.innerHTML === hexDisplay) {
        displayFirstColor.innerHTML = rgbDisplay;
      }
      // end of conditions for when to display in RGB and when to display in hex
    });
    // end of RGB to hex button display and event

    // display nickname input and validation and favourite color button
    firstColorForm.appendChild(firstColorNicknameLabel);
    firstColorForm.appendChild(firstColorNickname);
    firstColorForm.appendChild(favouriteFirstColorBtn);

    // end of display nickname input and validation and favourite color button
    form.appendChild(secondColorBtn);
  }
  evt.preventDefault();
});
// favourite button event
favouriteFirstColorBtn.addEventListener("click", () => {
  if (firstColorNickname.value === "") {
    alert("You have to give a nickname to your favourite color");
  } else {
    firstColor["nickname"] = firstColorNickname.value;
    favouriteColorArr.push(firstColor);
    firstColorNickname.value = "";
    console.log(favouriteColorArr);
  }
});
//end of favourite button event
colorDisplays.appendChild(firstColorForm);
let secondColorNicknameLabel = document.createElement("label");
secondColorNicknameLabel.setAttribute("for", "second-color-nickname");
secondColorNicknameLabel.textContent = "Give a nickname to your 2nd color";
let secondColorNickname = document.createElement("input");
secondColorNickname.type = "text";
secondColorNickname.name = "second-color-nickname";
secondColorNickname.id = "second-color-nickname";
secondColorNickname.placeholder = "Color nickname";

let favouriteSecondColorBtn = document.createElement("button");
favouriteSecondColorBtn.textContent = "Add second color to favourites";
secondColorBtn.addEventListener("click", (evt) => {
  // RGB input not empty validation
  if (R.value === "") {
    alert("You Have to give a value to Red");
  } else if (G.value === "") {
    alert("You Have to give a value to Green");
  } else if (B.value === "") {
    alert("You Have to give a value to Blue");
  } else {
    secondColor = {
      R: Number(R.value),
      G: Number(G.value),
      B: Number(B.value),
    };
    // end of RGB input not empty validation

    R.value = "";
    G.value = "";
    B.value = "";
    // RGB color display
    displaySecondColor.style.backgroundColor = `rgb(${secondColor.R}, ${secondColor.G}, ${secondColor.B})`;
    displaySecondColor.innerHTML = `<p>R:${secondColor.R} G:${secondColor.G} B:${secondColor.B}</p>`;
    displaySecondColor.style.color = `rgb(${secondColor.G}, ${secondColor.B}, ${secondColor.R})`;
    // end of RGB color display

    // RGB to hex button display and event
    rgbToHexBtn.addEventListener("click", () => {
      // display color in hex variable
      let hexDisplay =
        "<p>" +
        "#" +
        (
          (1 << 24) +
          (secondColor.R << 16) +
          (secondColor.G << 8) +
          secondColor.B
        )
          .toString(16)
          .slice(1) +
        "</p>";
      // end of display color in hex variable

      // display color in RGB variable
      let rgbDisplay = `<p>R:${secondColor.R} G:${secondColor.G} B:${secondColor.B}</p>`;
      // end of display color in RGB variable

      // conditions for when to display in RGB and when to display in hex
      if (displaySecondColor.innerHTML === rgbDisplay) {
        displaySecondColor.innerHTML = hexDisplay;
      } else if (displaySecondColor.innerHTML === hexDisplay) {
        displaySecondColor.innerHTML = rgbDisplay;
      }
    });
    // end of conditions for when to display in RGB and when to display in hex

    // display nickname input and validation and favourite color button
    secondColorForm.appendChild(secondColorNicknameLabel);
    secondColorForm.appendChild(secondColorNickname);
    secondColorForm.appendChild(favouriteSecondColorBtn);

    // end of display nickname input and validation and favourite color button
  }
  evt.preventDefault();
});

// favourite button event
favouriteSecondColorBtn.addEventListener("click", () => {
  if (secondColorNickname.value === "") {
    alert("You have to give a nickname to your favourite second color");
  } else {
    secondColor["nickname"] = secondColorNickname.value;
    favouriteColorArr.push(secondColor);
    secondColorNickname.value = "";
    console.log(favouriteColorArr);
  }
});
// end of favourite button event

colorDisplays.appendChild(secondColorForm);

// Favourites display
let displayFavourite = document.createElement("div");
let displayFavouriteBtn = document.createElement("button");
displayFavouriteBtn.textContent = "display favourite colors";
root.appendChild(displayFavouriteBtn);

root.appendChild(displayFavourite);
displayFavouriteBtn.addEventListener("click", () => {
  displayFavourite.innerHTML = "";
  favouriteColorArr.forEach((favourite) => {
    let favouriteColorDiv = document.createElement("div");
    favouriteColorDiv.className = "favourite-color";
    favouriteColorDiv.style.backgroundColor = `rgb(${favourite.R}, ${favourite.G}, ${favourite.B})`;
    favouriteColorDiv.style.color = `rgb(${favourite.G}, ${favourite.B}, ${favourite.R})`;
    favouriteColorDiv.innerHTML = `<h3>${favourite.nickname}</h3>
    <p>R:${favourite.R} G:${favourite.G} B:${favourite.B}</p>`;
    displayFavourite.appendChild(favouriteColorDiv);
  });
});

// end of favourites display
