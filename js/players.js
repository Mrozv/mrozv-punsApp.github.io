//variables

const nextPage = document.querySelector(".addPlayerNext");
const nameInput = document.querySelector(".playerName");
const addButton = document.querySelector(".addPlayer");
const playersUl = document.querySelector(".listOfPlayers");
const alert = document.querySelector(".alert");
const alertsContainer = document.querySelector(".alertsContainer");
let isAnimated = false;

readyButtonVisibility();

//functions

(() => {
  try {
    const raw = JSON.parse(localStorage.getItem("players")) || [];

    raw.forEach((player) => {
      const li = createPlayerElement(player);
      playersUl.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
})();

function add() {
  if (nameInput.value !== "") {
    const player = {
      name: nameInput.value,
      points: 0,
    };

    let players = JSON.parse(localStorage.getItem("players")) || [];
    players.push(player);

    localStorage.setItem("players", JSON.stringify(players));

    const li = createPlayerElement(player);
    playersUl.appendChild(li);
    nameInput.value = "";
  } else {
    alertFunc();
  }
  readyButtonVisibility();
}

function createPlayerElement(player) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const xIcon = document.createElement("i");

  deleteButton.classList.add("deleteButton");
  xIcon.classList.add("fa-solid", "fa-circle-xmark");
  li.textContent = player.name;
  deleteButton.append(xIcon);
  li.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    li.remove();

    const players = JSON.parse(localStorage.getItem("players")) || [];
    const index = players.findIndex((p) => p.name === player.name);

    if (index !== -1) {
      players.splice(index, 1);
      localStorage.setItem("players", JSON.stringify(players));
    }
    readyButtonVisibility();
  });

  return li;
}

function alertFunc() {
  if (!isAnimated) {
    isAnimated = true;
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.textContent = "Podaj nazwę gracza";
    alertsContainer.appendChild(alert);
    setTimeout(() => {
      isAnimated = false;
      alert.remove();
    }, 3000);
  }
}

function readyButtonVisibility() {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const nextPage = document.querySelector(".addPlayerNext");

  if (players.length === 0) {
    nextPage.style.display = "none";
  } else {
    nextPage.style.display = "block";
  }
}

//eventlisteners

nextPage.addEventListener("click", () => {
  window.location.href = "../html/game.html";
});
addButton.addEventListener("click", add);
nameInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    add();
  }
});
