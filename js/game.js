const playersModal = document.querySelector(".playersModal");
logPlayers();
const amountOfVerses = localStorage.getItem("amountOfVerses");
const contentArea = document.querySelector(".content");
const rollButton = document.querySelector(".roll");
const verse = document.querySelector(".text");
const roundCount = document.querySelector(".round");
const restartButton = document.querySelector(".restart");
const finalRestartButton = document.querySelector(".finalRestart");
const slideButton = document.querySelector(".listOfPlayersButton");
const playersUl = document.querySelector(".playersList");
const playersArray = playersUl.querySelectorAll(".item");
const plusButtons = document.querySelectorAll("#plus");
const minusButtons = document.querySelectorAll("#minus");
const playersListArrow = document.querySelector(".fa-caret-down");

let sentences;
let array = [];
let resultArray = [];
let round = 0;

if (localStorage.getItem("storageArray") !== null) {
  resultArray = localStorage.getItem("storageArray").split(",");
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
      roundCount.textContent = `${round}/${amountOfVerses}`;
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
      if (array.length > amountOfVerses) {
        verse.textContent = "Koniec rundy!";
        roundCount.textContent = ``;
        rollButton.style.display = "none";
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

(() => {
  plusButtons.forEach((element) => {
    element.addEventListener("click", (element) => {
      let listOfPlayers = JSON.parse(localStorage.getItem("players"));
      const listElement = element.target.parentElement.parentElement;
      console.log(listElement);
      const pointsContainer = listElement.querySelector(".leftContainer");
      const points = pointsContainer.querySelector("#points");
      const newPoints = (points.textContent = parseInt(points.textContent) + 1);

      const plusOwner = listElement
        .querySelector(".leftContainer")
        .querySelector("#name").textContent;
      listOfPlayers.forEach((element) => {
        element.name === plusOwner
          ? (element.points = newPoints)
          : (element.points = element.points);
      });
      localStorage.setItem("players", JSON.stringify(listOfPlayers));
    });
  });

  minusButtons.forEach((element) => {
    element.addEventListener("click", (element) => {
      let listOfPlayers = JSON.parse(localStorage.getItem("players"));
      const listElement = element.target.parentElement.parentElement;
      console.log(listElement);
      const pointsContainer = listElement.querySelector(".leftContainer");
      const points = pointsContainer.querySelector("#points");
      const newPoints = (points.textContent = parseInt(points.textContent) - 1);

      const plusOwner = listElement
        .querySelector(".leftContainer")
        .querySelector("#name").textContent;
      listOfPlayers.forEach((element) => {
        element.name === plusOwner
          ? (element.points = newPoints)
          : (element.points = element.points);
      });
      localStorage.setItem("players", JSON.stringify(listOfPlayers));
    });
  });
})();

playersListArrow.addEventListener("click", () => {
  playersListArrow.classList.toggle("flip");
});

function logPlayers() {
  let listOfPlayers = JSON.parse(localStorage.getItem("players"));
  let playersUL = document.createElement("ul");
  playersUL.classList.add("playersList");

  for (let i = 0; listOfPlayers.length > i; i++) {
    const player = listOfPlayers[i];
    const name = player.name;
    const li = document.createElement("li");
    const points = player.points;
    const playerNameContainer = document.createElement("div");
    const pointsEl = document.createElement("div");
    const addPoints = document.createElement("div");
    const minusPoints = document.createElement("div");
    const leftContainer = document.createElement("div");
    const rightContainer = document.createElement("div");

    leftContainer.classList.add("leftContainer");
    rightContainer.classList.add("rightContainer");

    playerNameContainer.setAttribute("id", "name");
    playerNameContainer.textContent = name;

    pointsEl.setAttribute("id", "points");

    addPoints.classList.add("pointsBtn");
    addPoints.setAttribute("id", "plus");

    minusPoints.classList.add("pointsBtn");
    minusPoints.setAttribute("id", "minus");

    addPoints.textContent = "+";
    minusPoints.textContent = "-";

    pointsEl.textContent = points;
    li.classList.add("item");

    leftContainer.append(playerNameContainer, pointsEl);
    rightContainer.append(addPoints, minusPoints);

    li.append(leftContainer, rightContainer);
    playersUL.append(li);
  }
  playersModal.append(playersUL);
}
