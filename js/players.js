const nextPage = document.querySelector(".addPlayerNext");
const nameInput = document.querySelector(".playerName");
const addButton = document.querySelector(".addPlayer");
const playersUl = document.querySelector(".listOfPlayers");

(() => {
  let raw = localStorage.getItem("players");
  raw = JSON.parse(raw);
  try {
    for (let i = 0; i !== raw.length; i++) {
      const li = document.createElement("li");
      const deleteButton = document.createElement("button");

      deleteButton.classList.add("deleteButton");
      li.textContent = raw[i].name;
      deleteButton.textContent = "x";
      li.appendChild(deleteButton);
      playersUl.appendChild(li);

      deleteButton.addEventListener("click", (e) => {
        const deleteButtons = document.querySelectorAll(".deleteButton");

        deleteButtons.forEach((element) => {
          element.addEventListener("click", () => {
            element.parentElement.remove();
            raw.forEach((e) => {
              if (
                e.name ===
                element.parentElement.textContent.trim().replace("x", "")
              ) {
                raw.splice(raw.indexOf(e), 1);
                localStorage.setItem("players", JSON.stringify(raw));
              }
            });
          });
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
})();

nextPage.addEventListener("click", () => {
  window.location.href = "../html/game.html";
});

addButton.addEventListener("click", () => {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  let players;

  if (localStorage.getItem("players") === null) {
    players = [];
  } else {
    players = JSON.parse(localStorage.getItem("players"));
  }

  deleteButton.classList.add("deleteButton");
  li.textContent = nameInput.value;
  deleteButton.textContent = "x";
  li.appendChild(deleteButton);
  playersUl.appendChild(li);

  const player = {
    name: `${nameInput.value}`,
    points: 0,
  };

  players.push(player);

  localStorage.setItem("players", JSON.stringify(players));

  deleteButton.addEventListener("click", (e) => {
    const deleteButtons = document.querySelectorAll(".deleteButton");

    deleteButtons.forEach((element) => {
      element.addEventListener("click", () => {
        element.parentElement.remove();
      });
    });
  });
});
