import { runners } from "./animals.js";

const root = document.getElementById("root");
let winnerP = document.createElement("p");
const jackpotDiv = document.createElement("div");
jackpotDiv.className = "jackpot-container";
root.appendChild(jackpotDiv);
let playerOnePoints = 100;
let jackpot = 0;
let playerTwoPoints = 100;
let playerOnePointsP = document.createElement("p");
let jackpotP = document.createElement("p");
let playerTwoPointsP = document.createElement("p");
playerOnePointsP.textContent = "Player 1: " + playerOnePoints + "pt";
jackpotP.textContent = "Jackpot: " + jackpot + "pt";
playerTwoPointsP.textContent = "Player 2: " + playerTwoPoints + "pt";
jackpotDiv.appendChild(playerOnePointsP);
jackpotDiv.appendChild(jackpotP);
jackpotDiv.appendChild(playerTwoPointsP);
// Creating the racing track
const racingTrack = document.createElement("div");
racingTrack.className = "racing-track";
root.appendChild(racingTrack);
const startLine = document.createElement("div");
startLine.className = "start-line";
const startLineText = document.createElement("p");
startLineText.textContent = "Start";
startLineText.className = "start-line-text";
const finishLine = document.createElement("div");
finishLine.className = "finish-line";
const finishLineText = document.createElement("p");
finishLineText.textContent = "Finish";
finishLineText.className = "finish-line-text";
startLine.appendChild(startLineText);
finishLine.appendChild(finishLineText);
racingTrack.appendChild(startLine);
racingTrack.appendChild(finishLine);
const runnersDiv = document.createElement("div");
runnersDiv.className = "animals-container";
racingTrack.appendChild(runnersDiv);

// Creating the betting section
const betDiv = document.createElement("div");
betDiv.className = "bet-div";
const btnDiv = document.createElement("div");
btnDiv.className = "btn-div";
const betAnimalBtn = document.createElement("button");
betAnimalBtn.textContent = "Bet Animal";
const startRaceBtn = document.createElement("button");
startRaceBtn.textContent = "Start Race";
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Race";
let announceParagraph = document.createElement("p");
announceParagraph.textContent = "Place your bet Player 1";
let playerOneBetP = document.createElement("p");
let playerTwoBetP = document.createElement("p");
root.appendChild(announceParagraph);
root.appendChild(playerOneBetP);
root.appendChild(playerTwoBetP);
root.appendChild(betDiv);

// Creating the animals for the race and for the betting section from the runners object in animals.js
for (const runner in runners) {
  if (Object.hasOwnProperty.call(runners, runner)) {
    // Creating the animals on the racing track
    const animal = runners[runner];
    let trackAnimalDiv = document.createElement("div");
    trackAnimalDiv.id = animal.id;
    trackAnimalDiv.className = "runner";
    let trackAnimal = document.createElement("img");
    trackAnimal.src = animal.img;
    trackAnimal.style.width = "inherit";
    trackAnimal.style.height = "100%";
    let trackAnimalVoice = document.createElement("p");
    trackAnimalVoice.textContent = '"' + animal.voice + '"';
    trackAnimalVoice.className = "voice";
    trackAnimalVoice.classList.add("speech");
    trackAnimalDiv.appendChild(trackAnimal);
    trackAnimalDiv.appendChild(trackAnimalVoice);
    runnersDiv.appendChild(trackAnimalDiv);

    // Creating the animals on the bet section
    let betAnimal = document.createElement("div");
    betAnimal.className = "bet-animal";
    betDiv.appendChild(betAnimal);
    let betAnimalImg = document.createElement("img");
    betAnimalImg.src = animal.img;
    betAnimalImg.id = "bet-" + animal.name;
    betAnimalImg.className = "bet-animal-img";
    betAnimal.appendChild(betAnimalImg);
    console.log(betAnimalImg);
  }
}
root.appendChild(btnDiv);
btnDiv.appendChild(betAnimalBtn);
btnDiv.appendChild(startRaceBtn);
let betDog = document.getElementById("bet-dog");
let betHorse = document.getElementById("bet-horse");
let betDuck = document.getElementById("bet-duck");
let betChick = document.getElementById("bet-chick");
let userOneBet = "";
let userTwoBet = "";
let chosen;
let animalVoice = document.querySelectorAll(".voice");
// Creating a choose animal to bet event
document.addEventListener("click", (evt) => {
  switch (evt.target.id) {
    case "bet-dog":
      betDog.style.transform = "scale(1.3)";
      betHorse.style.transform = "scale(1)";
      betDuck.style.transform = "scale(1)";
      betChick.style.transform = "scale(1)";
      chosen = evt.target;

      break;
    case "bet-horse":
      betDog.style.transform = "scale(1)";
      betHorse.style.transform = "scale(1.3)";
      betDuck.style.transform = "scale(1)";
      betChick.style.transform = "scale(1)";
      chosen = evt.target;
      break;
    case "bet-duck":
      betDog.style.transform = "scale(1)";
      betHorse.style.transform = "scale(1)";
      betDuck.style.transform = "scale(1.4)";
      betChick.style.transform = "scale(1)";
      chosen = evt.target;
      break;
    case "bet-chick":
      betDog.style.transform = "scale(1)";
      betHorse.style.transform = "scale(1)";
      betDuck.style.transform = "scale(1)";
      betChick.style.transform = "scale(1.3)";
      chosen = evt.target;
      break;
    default:
      betDog.style.transform = "scale(1)";
      betHorse.style.transform = "scale(1)";
      betDuck.style.transform = "scale(1)";
      betChick.style.transform = "scale(1)";
      chosen = undefined;
      break;
  }
});

// Creating bet animal button event for the players to bet on their animal
betAnimalBtn.addEventListener("click", () => {
  switch (userOneBet) {
    case "":
      if (chosen !== undefined) {
        userOneBet = chosen;
        announceParagraph.textContent = "Place your bet Player 2";
        playerOneBetP.textContent =
          "Player 1 bets: " +
          chosen.id.slice(4).charAt(0).toUpperCase() +
          chosen.id.slice(5) +
          " will win the race";
        chosen = undefined;
        playerOnePoints = pointsSum(playerOnePoints, -25);
        jackpot = pointsSum(jackpot, 25);
        jackpotP.textContent = "Jackpot: " + jackpot + "pt";
        playerOnePointsP.textContent = "Player 1: " + playerOnePoints + "pt";
      } else {
        announceParagraph.textContent = "You must choose an animal Player 1";
      }
      break;
    default:
      if (chosen !== undefined) {
        if (userTwoBet !== "") {
          announceParagraph.textContent = "Bets have been placed already";
          setTimeout(() => {
            announceParagraph.textContent =
              "Press Start Race to start the race";
          }, 1000);
        } else {
          if (chosen === userOneBet) {
            announceParagraph.textContent =
              "You can't bet the same as Player 1";
          } else {
            userTwoBet = chosen;
            announceParagraph.textContent = "Both players placed bets";
            playerTwoBetP.textContent =
              "Player 2 bets " +
              chosen.id.slice(4).charAt(0).toUpperCase() +
              chosen.id.slice(5) +
              " will win the race";
            setTimeout(() => {
              announceParagraph.textContent =
                "Press Start Race to start the race";
            }, 1000);
            chosen = undefined;
            playerTwoPoints = pointsSum(playerTwoPoints, -25);
            jackpot = pointsSum(jackpot, 25);
            jackpotP.textContent = "Jackpot: " + jackpot + "pt";
            playerTwoPointsP.textContent =
              "Player 2: " + playerTwoPoints + "pt";
          }
        }
      } else if (userTwoBet !== "") {
        announceParagraph.textContent = "Both players already placed bets";
      } else {
        announceParagraph.textContent = "You must choose an animal Player 2";
      }
      break;
  }
  console.log(userOneBet);
  console.log(userTwoBet);
});
const randVoiceStep = Math.floor(Math.random() * (401 - 250)) + 250;
startRaceBtn.addEventListener("click", () => {
  announceParagraph.textContent = "Race has been started";
  switch ((userOneBet, userTwoBet)) {
    case "":
      announceParagraph.textContent =
        "All players need to place their bets before starting the race";
      break;
    default:
      btnDiv.removeChild(betAnimalBtn);
      btnDiv.removeChild(startRaceBtn);
      let runner = document.querySelectorAll(".runner");
      let dogSteps = 0;
      let horseSteps = 0;
      let duckSteps = 0;
      let chickSteps = 0;
      let winner = 0;
      console.log(runner);
      runner.forEach((runner) => {
        setTimeout(() => {
          switch (runner.id) {
            case "dog":
              const dogRacing = setInterval(() => {
                runner.style.transform +=
                  "translateX(" + runners.dog.step + "px)";
                dogSteps += runners.dog.step;
                console.log("dog " + dogSteps);
                if (dogSteps >= 900) {
                  clearInterval(dogRacing);
                  winner++;
                  if (winner === 1) {
                    announceParagraph.textContent =
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " wins";
                    if (userOneBet.id === "bet-dog") {
                      playerOnePoints = pointsSum(jackpot, playerOnePoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerOnePointsP.textContent =
                        "Player 1: " + playerOnePoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 1 got the jackpot!";
                    } else if (userTwoBet.id === "bet-dog") {
                      playerTwoPoints = pointsSum(jackpot, playerTwoPoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerTwoPointsP.textContent =
                        "Player 2: " + playerTwoPoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 2 got the jackpot!";
                    } else {
                      announceParagraph.textContent +=
                        " the jackpot grows but no one took it";
                    }
                  } else if (winner === 4) {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " finished last</p>";
                    announceParagraph.innerHTML +=
                      "<p style = color:red>Press the Reset button on the head of the page to continue the betting and restart the race</p>";
                    if (playerOnePoints === 0 || playerTwoPoints === 0) {
                      resetBtn.textContent = "Reset Game";
                    } else {
                      resetBtn.textContent = "Reset Race";
                    }
                    root.prepend(resetBtn);
                    if (root.contains(resetBtn)) {
                      if (playerOnePoints === 0 && playerTwoPoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 2 wins the game!!!";
                      } else if (playerTwoPoints === 0 && playerOnePoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 1 wins the game!!!";
                      } else if (
                        playerOnePoints === 0 &&
                        playerTwoPoints === 0
                      ) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Its a draw";
                      }
                    }
                  } else {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " is number " +
                      winner +
                      "</p>";
                  }
                }
                let dogBark = new Audio("../Animal Voices/dog.wav");
                if (dogSteps > randVoiceStep) {
                  animalVoice[0].style.display = "block";
                  dogBark.play();
                  if (dogSteps >= randVoiceStep + 50) {
                    animalVoice[0].style.display = "none";
                    dogBark.pause();
                  }
                }
              }, Math.floor(Math.random() * (701 - 150)) + 150);
              break;
            case "horse":
              const horseRacing = setInterval(() => {
                runner.style.transform +=
                  "translateX(" + runners.horse.step + "px)";
                horseSteps += runners.horse.step;
                console.log("horse" + horseSteps);
                if (horseSteps >= 900) {
                  clearInterval(horseRacing);
                  winner++;
                  if (winner === 1) {
                    announceParagraph.textContent =
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " wins";
                    if (userOneBet.id === "bet-horse") {
                      playerOnePoints = pointsSum(jackpot, playerOnePoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerOnePointsP.textContent =
                        "Player 1: " + playerOnePoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 1 got the jackpot!";
                    } else if (userTwoBet.id === "bet-horse") {
                      playerTwoPoints = pointsSum(jackpot, playerTwoPoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerTwoPointsP.textContent =
                        "Player 2: " + playerTwoPoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 2 got the jackpot!";
                    } else {
                      announceParagraph.textContent +=
                        " the jackpot grows but no one took it";
                    }
                  } else if (winner === 4) {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " finished last</p>";
                    announceParagraph.innerHTML +=
                      "<p style = color:red>Press the Reset button on the head of the page to continue the betting and restart the race</p>";
                    if (playerOnePoints === 0 || playerTwoPoints === 0) {
                      resetBtn.textContent = "Reset Game";
                    } else {
                      resetBtn.textContent = "Reset Race";
                    }
                    root.prepend(resetBtn);
                    if (root.contains(resetBtn)) {
                      if (playerOnePoints === 0 && playerTwoPoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 2 wins the game!!!";
                      } else if (playerTwoPoints === 0 && playerOnePoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 1 wins the game!!!";
                      } else if (
                        playerOnePoints === 0 &&
                        playerTwoPoints === 0
                      ) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Its a draw";
                      }
                    }
                  } else {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " is number " +
                      winner +
                      "</p>";
                  }
                }
                let horseNeigh = new Audio("../Animal Voices/horse.wav");
                if (horseSteps > randVoiceStep) {
                  animalVoice[1].style.display = "block";
                  horseNeigh.play();
                  if (horseSteps >= randVoiceStep + 70) {
                    animalVoice[1].style.display = "none";
                    horseNeigh.pause();
                  }
                }
              }, Math.floor(Math.random() * (1001 - 150)) + 150);
              break;
            case "duck":
              const duckRacing = setInterval(() => {
                runner.style.transform +=
                  "translateX(" + runners.duck.step + "px)";
                duckSteps += runners.duck.step;
                console.log("duck " + duckSteps);
                if (duckSteps >= 900) {
                  clearInterval(duckRacing);
                  winner++;
                  if (winner === 1) {
                    announceParagraph.textContent =
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " wins";
                    if (userOneBet.id === "bet-duck") {
                      playerOnePoints = pointsSum(jackpot, playerOnePoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerOnePointsP.textContent =
                        "Player 1: " + playerOnePoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 1 got the jackpot!";
                    } else if (userTwoBet.id === "bet-duck") {
                      playerTwoPoints = pointsSum(jackpot, playerTwoPoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerTwoPointsP.textContent =
                        "Player 2: " + playerTwoPoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 1 got the jackpot!";
                    } else {
                      announceParagraph.textContent +=
                        " the jackpot grows but no one took it";
                    }
                  } else if (winner === 4) {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " finished last</p>";
                    announceParagraph.innerHTML +=
                      "<p style = color:red>Press the Reset button on the head of the page to continue the betting and restart the race</p>";
                    if (playerOnePoints === 0 || playerTwoPoints === 0) {
                      resetBtn.textContent = "Reset Game";
                    } else {
                      resetBtn.textContent = "Reset Race";
                    }
                    root.prepend(resetBtn);
                    if (root.contains(resetBtn)) {
                      if (playerOnePoints === 0 && playerTwoPoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 2 wins the game!!!";
                      } else if (playerTwoPoints === 0 && playerOnePoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 1 wins the game!!!";
                      } else if (
                        playerOnePoints === 0 &&
                        playerTwoPoints === 0
                      ) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Its a draw";
                      }
                    }
                  } else {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " is number " +
                      winner +
                      "</p>";
                  }
                }
                let duckQuack = new Audio("../Animal Voices/duck.mp3");
                if (duckSteps > randVoiceStep) {
                  animalVoice[2].style.display = "block";
                  duckQuack.play();
                  if (duckSteps >= randVoiceStep + 40) {
                    animalVoice[2].style.display = "none";
                    duckQuack.pause();
                  }
                }
              }, Math.floor(Math.random() * (601 - 150)) + 150);
              break;
            case "chick":
              const chickRacing = setInterval(() => {
                runner.style.transform +=
                  "translateX(" + runners.chick.step + "px)";
                chickSteps += runners.chick.step;
                console.log("chick " + chickSteps);
                if (chickSteps >= 900) {
                  clearInterval(chickRacing);
                  winner++;
                  if (winner === 1) {
                    announceParagraph.textContent =
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " wins";
                    if (userOneBet.id === "bet-chick") {
                      playerOnePoints = pointsSum(jackpot, playerOnePoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerOnePointsP.textContent =
                        "Player 1: " + playerOnePoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 1 got the jackpot!";
                    } else if (userTwoBet.id === "bet-chick") {
                      playerTwoPoints = pointsSum(jackpot, playerTwoPoints);
                      jackpot = 0;
                      jackpotP.textContent = "Jackpot: " + jackpot + "pt";
                      playerTwoPointsP.textContent =
                        "Player 2: " + playerTwoPoints + "pt";
                      announceParagraph.textContent +=
                        " and Player 2 got the jackpot!";
                    } else {
                      announceParagraph.textContent +=
                        " the jackpot grows but no one took it";
                    }
                  } else if (winner === 4) {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " finished last</p>";
                    announceParagraph.innerHTML +=
                      "<p style = color:red>Press the Reset button on the head of the page to continue the betting and restart the race</p>";
                    if (playerOnePoints === 0 || playerTwoPoints === 0) {
                      resetBtn.textContent = "Reset Game";
                    } else {
                      resetBtn.textContent = "Reset Race";
                    }
                    root.prepend(resetBtn);
                    if (root.contains(resetBtn)) {
                      if (playerOnePoints === 0 && playerTwoPoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 2 wins the game!!!";
                      } else if (playerTwoPoints === 0 && playerOnePoints > 0) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Player 1 wins the game!!!";
                      } else if (
                        playerOnePoints === 0 &&
                        playerTwoPoints === 0
                      ) {
                        root.prepend(winnerP);
                        winnerP.textContent = "Its a draw";
                      }
                    }
                  } else {
                    announceParagraph.innerHTML +=
                      "<p>" +
                      runner.id.charAt(0).toUpperCase() +
                      runner.id.slice(1) +
                      " is number " +
                      winner +
                      "</p>";
                  }
                }
                let chickChirp = new Audio("../Animal Voices/chick.mp3");
                if (chickSteps > randVoiceStep) {
                  animalVoice[3].style.display = "block";
                  chickChirp.play();
                  if (chickSteps >= randVoiceStep + 30) {
                    animalVoice[3].style.display = "none";
                    chickChirp.pause();
                  }
                }
              }, Math.floor(Math.random() * (401 - 150)) + 100);
              break;
          }
        }, 1000);
      });
      break;
  }
});

resetBtn.addEventListener("click", () => {
  btnDiv.appendChild(betAnimalBtn);
  btnDiv.appendChild(startRaceBtn);
  let runner = document.querySelectorAll(".runner");
  runner.forEach((animal) => {
    animal.style.transform = "translateX(0)";
    userOneBet = "";
    userTwoBet = "";
    announceParagraph.textContent = "Place your bet Player 1";
    playerOneBetP.textContent = "";
    playerTwoBetP.textContent = "";
  });
  if (playerOnePoints === 0 || playerTwoPoints === 0) {
    playerOnePoints = 100;
    playerTwoPoints = 100;
    jackpot = 0;
    playerOnePointsP.textContent = "Player 1: " + playerOnePoints + "pt";
    jackpotP.textContent = "Jackpot: " + jackpot + "pt";
    playerTwoPointsP.textContent = "Player 2: " + playerTwoPoints + "pt";
  }
  root.removeChild(resetBtn);
});
function pointsSum(num1, num2) {
  return num1 + num2;
}
