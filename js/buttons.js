const startBtn = document.querySelector(".start");
const rankingBtn = document.querySelector(".ranking");
const backSettingsBtn = document.querySelector(".back");

startBtn.addEventListener("click", () => {
  window.location.href = "html/settings.html";
});

rankingBtn.addEventListener("click", () => {
  window.location.href = "html/ranking.html";
});
