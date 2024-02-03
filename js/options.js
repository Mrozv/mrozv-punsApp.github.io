const options = document.querySelectorAll(".timeElement");
const backSettingsBtn = document.querySelector(".back");

options.forEach((element) => {
  element.addEventListener("click", () => {
    localStorage.setItem("amountOfVerses", element.textContent);
    window.location.href = "players.html";
  });
});

backSettingsBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

