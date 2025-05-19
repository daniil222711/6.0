let count = parseInt(localStorage.getItem("count")) || 0;
let clickPower = parseFloat(localStorage.getItem("clickPower")) || 1;
let cps = 0;
let boosts = [
  { name: "Запуск темки", power: 0.2, basePrice: 50, count: 0 },
  { name: "Реклама", power: 0.5, basePrice: 150, count: 0 },
  { name: "Сторис", power: 1.2, basePrice: 500, count: 0 },
  { name: "Прямая", power: 2, basePrice: 1000, count: 0 },
  { name: "Реакция", power: 5, basePrice: 2000, count: 0 }
];

function updateDisplay() {
  document.getElementById("count").textContent = Math.floor(count) + " рублей";
  document.getElementById("cps").textContent = cps.toFixed(1) + " кликов/сек";
  localStorage.setItem("count", count);
}

function createBoostButtons() {
  const boostDiv = document.getElementById("boosts");
  boostDiv.innerHTML = "";
  boosts.forEach((boost, index) => {
    const price = Math.floor(boost.basePrice * Math.pow(2.3, boost.count));
    const btn = document.createElement("button");
    btn.textContent = `${boost.name} (+${boost.power}/с) - ${price} ₽`;
    btn.onclick = () => {
      if (count >= price) {
        count -= price;
        boost.count++;
        cps += boost.power;
        updateDisplay();
        createBoostButtons();
      }
    };
    boostDiv.appendChild(btn);
  });
}

document.getElementById("clicker-button").addEventListener("click", () => {
  count += clickPower;
  animateClick();
  updateDisplay();
});

function animateClick() {
  const anim = document.createElement("div");
  anim.textContent = "+" + clickPower;
  anim.className = "click-float";
  anim.style.position = "absolute";
  anim.style.left = "50%";
  anim.style.top = "60%";
  anim.style.transform = "translateX(-50%)";
  anim.style.opacity = 1;
  anim.style.transition = "top 0.8s ease, opacity 0.8s ease";
  document.body.appendChild(anim);

  setTimeout(() => {
    anim.style.top = "40%";
    anim.style.opacity = 0;
    setTimeout(() => document.body.removeChild(anim), 800);
  }, 10);
}

setInterval(() => {
  count += cps / 10;
  updateDisplay();
}, 100);

setInterval(() => {
  localStorage.setItem("count", count);
  localStorage.setItem("clickPower", clickPower);
}, 2000);

document.getElementById("upgrade-menu-toggle").onclick = () => {
  document.getElementById("upgrade-menu").classList.toggle("hidden");
};

document.getElementById("menu-toggle").onclick = () => {
  document.getElementById("extra-menu").classList.toggle("hidden");
};

function buyStoreItem(item) {
  if (item === "x3") clickPower *= 3;
  if (item === "x4") clickPower *= 4;
  if (item === "10000") count += 10000;
  updateDisplay();
}

updateDisplay();
createBoostButtons();
