const options = document.querySelectorAll(".timeElement");

options.forEach((element) => {
  element.addEventListener("click", () => {
    localStorage.setItem("amountOfVerses", element.textContent);
    window.location.href = "players.html";
  });
});
