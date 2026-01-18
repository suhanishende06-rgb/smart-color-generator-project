let isHex = true;
let currentColor = "#000000";

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
}

function hexToRgb(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function applyColor(color) {
  document.getElementById("colorBox").style.background = color;
  document.getElementById("colorCode").innerText =
    isHex ? color : hexToRgb(color);
}

function generateColor() {
  currentColor = randomHex();
  applyColor(currentColor);
}

function toggleFormat() {
  isHex = !isHex;
  applyColor(currentColor);
}

function generateGradient() {
  const c1 = randomHex();
  const c2 = randomHex();
  document.getElementById("colorBox").style.background =
    `linear-gradient(135deg, ${c1}, ${c2})`;
  document.getElementById("colorCode").innerText = `${c1} → ${c2}`;
}

function saveColor() {
  let colors = JSON.parse(localStorage.getItem("colors")) || [];
  if (!colors.includes(currentColor)) {
    colors.push(currentColor);
    localStorage.setItem("colors", JSON.stringify(colors));
    renderPalette();
  }
}

function renderPalette() {
  const palette = document.getElementById("palette");
  palette.innerHTML = "";
  const colors = JSON.parse(localStorage.getItem("colors")) || [];

  colors.forEach(color => {
    const div = document.createElement("div");
    div.style.background = color;
    div.title = "Click to copy " + color;

    div.onclick = () => {
      navigator.clipboard.writeText(color);
      currentColor = color;
      applyColor(color);
      alert("Copied: " + color);
    };

    palette.appendChild(div);
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

renderPalette();
generateColor();
