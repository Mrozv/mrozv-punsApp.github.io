const playersUl = document.querySelector(".ranking");

let raw = localStorage.getItem("players");
raw = JSON.parse(raw);
try {
  for (let i = 0; i !== raw.length; i++) {
    const li = document.createElement("li");
    const name = document.createElement("div");
    const score = document.createElement("div");

    name.textContent = raw[i].name;
    score.textContent = raw[i].points;

    li.append(name, score);
    playersUl.appendChild(li);
  }
} catch (error) {
  console.log(error);
}
