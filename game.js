const amountOfVerses = localStorage.getItem("amountOfVerses");
const contentArea = document.querySelector(".content");
const rollButton = document.querySelector(".roll");
const verse = document.querySelector(".text");
const roundCount = document.querySelector(".round");
const restartButton = document.querySelector(".restart");
let sentences;
let array = [];
let round = 0;

fetch("/content.txt")
  .then((res) => res.text())
  .then((text) => {
    sentences = text.split("\n");
    rollButton.addEventListener("click", () => {
      round++;
      roundCount.textContent = `Przysłowie w rundzie: ${round}/${amountOfVerses}`;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      let num = getRandomInt(106);
      array.forEach((element) => {
        if (element === num) {
          while (element === num) {
            num = getRandomInt(106);
          }
        } else {
          verse.textContent = sentences[num];
        }
      });
      verse.textContent = sentences[num];
      array.push(num);
      if (array.length > amountOfVerses) {
        verse.textContent = "Koniec rundy!";
        roundCount.textContent = ``;
        restartButton.style.display = "block";
        array.pop();
      }
    });
    restartButton.addEventListener("click", () => {
      round = 0;
      array.length = 0;
      restartButton.style.display = "none";
      verse.textContent = "Losuj!";
    });
  })
  .catch((e) => console.error(e));
