const nextPage = document.querySelector(".addPlayerNext");
const nameInput = document.querySelector(".playerName");
const addButton = document.querySelector(".addPlayer");
const playersUl = document.querySelector(".listOfPlayers");
const alert = document.querySelector(".alert");

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

nextPage.addEventListener("click", () => {
  window.location.href = "../html/game.html";
});

addButton.addEventListener("click", () => {
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
  } else {
    alert.classList.remove("slide");
    setTimeout(() => {
      alert.classList.add("slide");
    }, 5000);
  }
});

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
  });

  return li;
}
