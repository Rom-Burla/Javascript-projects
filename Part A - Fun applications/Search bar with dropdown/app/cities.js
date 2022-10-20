let url =
  "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json";
let url2 = "https://countriesnow.space/api/v0.1/countries";
let worldCities;
async function getCountry() {
  let response = await fetch(url2);
  let data = await response.json();
  data = data.data;
  let countries = await data.map((country) => {
    return {
      country: country.country,
      code: country.iso2,
    };
  });
  console.log(countries);
}
getCountry();
async function getCities() {
  let response = await fetch(url).catch((err) => {
    console.log(err);
  });
  let data = await response.json().catch((err) => {
    console.log(err);
  });
  worldCities = data;
  console.log(worldCities);
}
getCities();

let root = document.getElementById("root");
let instructions = document.createElement("p");
instructions.innerHTML = `Please write a city name in the text box and then the city will be added to the dropdown menu bellow (notice some of the city names in the database are written with letters from other laguages (like latin) you can find them in the console)`;
root.appendChild(instructions);
let instructions2 = document.createElement("p");
instructions2.textContent = `click on a city to make it with the visited color, then double click to make it a will visit city and then another click to make it a will never visit city, click again to reset`;
let userInput = document.createElement("input");
let noMatch = document.createElement("div");
root.appendChild(noMatch);
let regex = [/ \d+ /];
userInput.type = "text";
userInput.placeholder = "Enter a city";
userInput.id = "city-input";
root.appendChild(userInput);
let submitCity = document.createElement("button");
submitCity.textContent = "submit city";
root.appendChild(submitCity);
let cities = [];
let dropdown = document.createElement("div");
dropdown.className = "dropdown";
let searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "Search a city";
searchBar.className = "search-bar";
let dropdownBtn = document.createElement("button");
dropdownBtn.className = "dropdown-button";
dropdownBtn.innerHTML = `<i class="arrow down"></i>`;
let dropdownContent = document.createElement("div");
dropdownContent.className = "dropdown-content";
let cityDisplay = document.createElement("div");
cityDisplay.className = "city-display";
let userCitiesBtn = document.createElement("button");
userCitiesBtn.textContent =
  "Display all the cities you have added to the dropdown";
let allCitiesBtn = document.createElement("button");
allCitiesBtn.textContent =
  "Display all of the cities in our database (takes a lot of time and effort from the computer! our database is big)";
allCitiesBtn.style.float = "right";
const chooseOtherColor = document.createElement("button");
chooseOtherColor.textContent = "Choose other colors (resets your chosen ones)";
root.appendChild(userCitiesBtn);
root.appendChild(chooseOtherColor);
root.appendChild(dropdown);
dropdown.appendChild(searchBar);
dropdown.appendChild(dropdownBtn);
dropdown.appendChild(dropdownContent);
root.appendChild(instructions2);
root.appendChild(cityDisplay);
root.appendChild(allCitiesBtn);
chooseOtherColor.addEventListener("click", () => {
  window.location.href = "../index.html";
});
userInput.addEventListener("keyup", () => {
  userInput.value.match(
    /^[\p{Letter}\p{Mark}\s]+/gu ||
      /^[a-z][a-z\s]*$/gi ||
      /^[\p{Letter}\p{Mark}]+/gu ||
      /^[\p{Letter}\p{Mark}-]+/gu ||
      /^[\p{Letter}\p{Mark}\s-]+/gu
  )
    ? true
    : (userInput.value = userInput.value.substring(
        0,
        userInput.value.length - 1
      ));
});
userInput.addEventListener("blur", () => {
  let words = userInput.value.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  userInput.value = words.join(" ");
});

submitCity.addEventListener("click", () => {
  userInput.value.toLowerCase();
  for (let i = 0; i < worldCities.length; i++) {
    if (userInput.value.toLowerCase() === worldCities[i].name.toLowerCase()) {
      cities.push(worldCities[i]);
    }
  }
  if (cities.length === 0) {
    noMatch.innerHTML =
      "No such city in our database, check if you made a type error";
  }
  cities.forEach((city) => {
    if (city.name.toLowerCase() === userInput.value.toLowerCase()) {
      noMatch.innerHTML = userInput.value + " " + "added";
    } else if (city.name.toLowerCase() !== userInput.value.toLowerCase()) {
      noMatch.innerHTML =
        "No such city in our database, check if you made a type error";
    }
  });
  for (let i = 0; i < cities.length; i++) {
    for (let k = 0; k < cities.length; k++) {
      if (i !== k) {
        if (
          cities[i].country === cities[k].country &&
          cities[i].name === cities[k].name
        ) {
          noMatch.innerHTML =
            "There are multiple" +
            " " +
            cities[i].name +
            "," +
            " " +
            cities[i].country +
            " " +
            "in your list we have deleted one and if needed we will delete another the next time you add a city";
          cities.splice(i, 1);
          console.log(cities);
        }
      }
    }
  }
  for (let i = 0; i < cities.length; i++) {
    if (
      !dropdownContent.innerHTML.includes(cities[i].name) ||
      !dropdownContent.innerHTML.includes(cities[i].country)
    ) {
      dropdownContent.innerHTML += `<div class="user-city" id="${cities[i].name}${cities[i].country}">${cities[i].name}, ${cities[i].country}</div>`;
    }
  }
  userInput.value = "";
});
dropdownBtn.addEventListener("click", () => {
  dropdownContent.classList.toggle("show-dropdown");
});
searchBar.addEventListener("keyup", () => {
  dropdownContent.classList.add("show-dropdown");
  if (searchBar.value === "") {
    dropdownContent.classList.remove("show-dropdown");
  }
  let filter = searchBar.value.toUpperCase();
  for (let i = 0; i < cities.length; i++) {
    let city = document.getElementsByClassName("city")[i];
    if (city.textContent.toUpperCase().indexOf(filter) >= 0) {
      city.style.display = "";
    } else {
      city.style.display = "none";
    }
  }
});
document.addEventListener("click", (evt) => {
  cities.forEach((city) => {
    if (evt.target.className === "user-city") {
      if (evt.target.id === `${city.name}${city.country}`) {
        let chosenCity = document.getElementById(`${city.name}${city.country}`);
        cityDisplay.innerHTML += `<p class = "city" id = "${city.name}${city.country}">${chosenCity.textContent}</p>`;
      }
    }
  });
});
userCitiesBtn.addEventListener("click", () => {
  cityDisplay.innerHTML = "";
  let sortedCities = cities.sort((a, b) => a.name.localeCompare(b.name));
  sortedCities.forEach((city) => {
    cityDisplay.innerHTML += `<p class = "city" id = "${city.name}${city.country}">${city.name}, ${city.country}</p>`;
  });
});
allCitiesBtn.addEventListener("click", () => {
  let sortedCities = worldCities.sort((a, b) => a.name.localeCompare(b.name));
  cityDisplay.innerHTML = "";
  for (let i = 0; i < sortedCities.length; i++) {
    if (i <= 2000) {
      console.log(sortedCities[i]);
      cityDisplay.innerHTML += `<p class = "city" id = "${sortedCities[i].name}${sortedCities[i].country}">${sortedCities[i].name}, ${sortedCities[i].country}</p>`;
    }
    setInterval(() => {
      if (i <= i + 500) {
        console.log(sortedCities[i]);
        cityDisplay.innerHTML += `<p>${sortedCities[i].name}, ${sortedCities[i].country}</p>`;
      }
    }, 3000);
  }
});
// Make city background color change when click and change again when double click Let the user choose the colors from color picker, sort cities by 3 categories: visited, will visit, never visit! let the user have an option to reset the city background color
let visited = JSON.parse(localStorage.getItem(localStorage.key(0)));
let willVisit = JSON.parse(localStorage.getItem(localStorage.key(1)));
let neverVisit = JSON.parse(localStorage.getItem(localStorage.key(2)));

document.addEventListener("click", (evt) => {
  if (evt.target.className === "city") {
    evt.target.style.backgroundColor = `rgb(${visited.R}, ${visited.G}, ${visited.B})`;
    if (
      evt.target.style.backgroundColor ===
      `rgb(${visited.R}, ${visited.G}, ${visited.B})`
    ) {
      document.addEventListener("dblclick", (evt) => {
        if (evt.target.className === "city") {
          evt.target.style.backgroundColor = `rgb(${willVisit.R}, ${willVisit.G}, ${willVisit.B})`;
          document.addEventListener("click", (evt) => {
            if (evt.target.className === "city") {
              evt.target.style.backgroundColor = `rgb(${neverVisit.R}, ${neverVisit.G}, ${neverVisit.B})`;
              document.addEventListener("click", (evt) => {
                if (evt.target.className === "city") {
                  evt.target.style.backgroundColor = "";
                  document.addEventListener("click", (evt) => {
                    if (evt.target.className === "city") {
                      evt.target.style.backgroundColor = `rgb(${visited.R}, ${visited.G}, ${visited.B})`;
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }
});
