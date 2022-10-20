import { runners } from "./animals.js";
const root = document.getElementById('root');
let screenwidth = window.innerWidth;
let raceIsNotOver = document.createElement('p');
raceIsNotOver.textContent = "race isn't finished yet";
let startRace = document.createElement('button');
startRace.textContent = 'Start Race';
let startOver = document.createElement('button');
startOver.textContent = 'Start Over';
root?.appendChild(startRace);
let chosen = ["", ""];
console.log(chosen);
raceIsNotOver.style.display = 'none';
let animal;
for (animal in runners) {
    const runner = runners[animal];
    const runnerImg = document.createElement('img');
    runnerImg.src = runner.img;
    runnerImg.id = runner.id;
    runnerImg.className = 'animal';
    root?.appendChild(runnerImg);
    let i = runner.step;
    let k = i;
    runnerImg.addEventListener('click', () => {
        if (chosen[0] === '') {
            chosen.splice(0, 1, runnerImg.id);
            console.log(chosen);
        }
        else if (chosen[1] === '') {
            chosen.splice(1, 1, runner.id);
            console.log(chosen);
        }
    });
    startRace.addEventListener('click', () => {
        setTimeout(() => {
            function race() {
                {
                    let timer = setInterval(() => {
                        k = k + i;
                        console.log(runner.id + " " + k);
                        if (k >= screenwidth) {
                            clearInterval(timer);
                            console.log(runner.id + ' Finishes the race');
                            runnerImg.classList.add('finisher');
                            runnerImg.style.transform = `translateX(${runner.step * Math.floor(Math.random() * 20)}px)`;
                        }
                        else if (!runnerImg.classList.contains('finisher')) {
                            runnerImg.style.transform += `translateX(${runner.step}px)`;
                            runnerImg.style.transition = '0.7s ease-in-out';
                        }
                    }, 500);
                }
            }
            race();
        }, 1000);
        startOver.addEventListener('click', () => {
            if (runnerImg.classList.contains('finisher')) {
                runnerImg.style.transform = "translate(0px)";
                runnerImg.classList.remove('finisher');
                k = i;
                raceIsNotOver.style.display = 'none';
            }
            else {
                raceIsNotOver.style.display = 'block';
                raceIsNotOver.style.transition = '0.5s ease-in-out';
                raceIsNotOver.style.backgroundColor = 'red';
                setTimeout(() => { raceIsNotOver.style.backgroundColor = 'rgba(255, 0, 0, 0)'; }, 500);
            }
        });
    });
}
root?.appendChild(raceIsNotOver);
root?.appendChild(startOver);
