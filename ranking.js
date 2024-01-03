const addPlayerButton = document.querySelector(".addPlayer");
const listOfPlayers = document.querySelector(".listOfPlayers");

window.addEventListener("load", () => {
  arrayOfPlayers = JSON.parse(localStorage.getItem("arrayOfPlayers")) || [];
  arrayOfPlayers.map((element) => {
    let item = document.createElement("li");
    item.textContent = element.name;
    listOfPlayers.appendChild(item);
  });
});

let arrayOfPlayers = [];
let points = 0;

addPlayerButton.addEventListener("click", () => {
  const playerNameInput = document.querySelector(".playerName");
  let found = (e) => e.name === playerNameInput.value;
  if (arrayOfPlayers.some(found) === false) {
    let name = playerNameInput.value;
    let li = document.createElement("li");
    li.textContent = name;
    listOfPlayers.appendChild(li);

    let player = {
      name: name,
      points: points,
    };

    arrayOfPlayers.push(player);

    localStorage.setItem("arrayOfPlayers", JSON.stringify(arrayOfPlayers));
  } else {
    console.log("error");
  }
});
