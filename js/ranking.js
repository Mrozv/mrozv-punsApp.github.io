const playersUl = document.querySelector(".rankingContainer");
const title = document.querySelector(".title");

let raw = localStorage.getItem("players");
raw = JSON.parse(raw);

let rawSorted = raw.sort((a, b) => {
  return b.points - a.points;
});

for (let i = 0; i !== rawSorted.length; i++) {
  const li = document.createElement("li");
  const name = document.createElement("div");
  name.classList.add("name");
  const score = document.createElement("div");
  score.classList.add("score");

  name.textContent = rawSorted[i].name;
  score.textContent = rawSorted[i].points;

  li.classList.add("listElement");
  li.append(name, score);
  playersUl.appendChild(li);
}
if (rawSorted.length === 0) {
  title.textContent = "Brak graczy";
} else {
  title.textContent = "Ranking";
}
