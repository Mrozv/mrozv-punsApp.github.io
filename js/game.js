const playersModal = document.querySelector(".playersModal");
logPlayers();
const amountOfVerses = localStorage.getItem("amountOfVerses");
const contentArea = document.querySelector(".content");
const rollButton = document.querySelector(".roll");
const verse = document.querySelector(".text");
const roundCount = document.querySelector(".round");
const restartButton = document.querySelector(".restart");
const finalRestartButton = document.querySelector(".finalRestart");
const slideButton = document.querySelector(".slide");
const playersUl = document.querySelector(".playersList");
const playersArray = playersUl.querySelectorAll(".item");

let sentences;
let array = [];
let resultArray = [];
let round = 0;

if (localStorage.getItem("players") !== null) {
  resultArray = localStorage.getItem("players").split(",");
  resultArray = resultArray.map((string) => {
    return parseInt(string, 10);
  });
}

fetch("../content.json")
  .then((res) => res.text())
  .then((text) => {
    sentences = text.split("\n");
    rollButton.addEventListener("click", () => {
      round++;
      roundCount.textContent = `Przysłowie w rundzie: ${round}/${amountOfVerses}`;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      let num = getRandomInt(sentences.length);
      resultArray.forEach((element) => {
        if (element === num) {
          while (element === num) {
            num = getRandomInt(sentences.length);
          }
        } else {
          verse.textContent = sentences[num];
        }
      });
      verse.textContent = sentences[num];
      array.push(num);
      resultArray.push(num);
      if (array.length >= amountOfVerses) {
        verse.textContent = "Koniec rundy!";
        roundCount.textContent = ``;
        restartButton.style.display = "block";
      }
      if (resultArray.length === sentences.length) {
        verse.textContent =
          "Ilość przysłów została wyczerpana, naciśnij przycisk aby zresetować grę!";
        rollButton.style.display = "none";
        restartButton.style.display = "none";
        roundCount.style.display = "none";
        finalRestartButton.style.display = "block";
        finalRestartButton.addEventListener("click", () => {
          localStorage.clear();
          window.location.href = "index.html";
        });
      }
    });
    restartButton.addEventListener("click", () => {
      localStorage.setItem("storageArray", resultArray);
      restartButton.style.display = "none";
      window.location.href = "settings.html";
    });
  })
  .catch((e) => console.error(e));

slideButton.addEventListener("click", () => {
  playersModal.classList.toggle("hide");
});

function logPlayers() {
  let listOfPlayers = JSON.parse(localStorage.getItem("players"));
  let playersUL = document.createElement("ul");
  playersUL.classList.add("playersList");

  for (let i = 0; listOfPlayers.length > i; i++) {
    let player = listOfPlayers[i];
    let name = player.name;
    let li = document.createElement("li");
    li.classList.add("item");
    li.textContent = name;
    playersUL.append(li);
  }
  playersModal.append(playersUL);
}
