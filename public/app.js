if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

import aboutViewHTML from "./views/aboutView.mjs";
import patternsViewHTML from "./views/patternsView.mjs";
import homeViewHTML from "./views/homeView.mjs";
import licenseViewHTML from "./views/licenseView.mjs";

//------------------------ Navigation ------------------------
const routes = {
  home: homeViewHTML,
  patterns: patternsViewHTML,
  about: aboutViewHTML,
  license: licenseViewHTML,
};

async function navigate(route) {
  const app = document.getElementById("app");
  app.innerHTML = routes[route] || "<h2>Siden finnes ikke</h2>";
  if(route === "patterns") {
    await showPatterns();
  }else if(route === "home") {
    document.getElementById("newPattern").addEventListener("click", newPattern);
    document.getElementById("showPatterns").addEventListener("click", showPatterns);
  }
}

document.querySelectorAll("nav").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = event.target.dataset.route;
    navigate(route);
  });
});


navigate("home");

//------------------------ Install button ------------------------
let deferredEvent;
let installButton = document.getElementById("installButton");

if (!deferredEvent) {
  installButton.style.display = "none";
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredEvent = event;
  if (deferredEvent) {
    installButton.style.display = "block";
  } else {
    installButton.style.display = "none";
  }
});

installButton.addEventListener("click", () => {
  console.log("installButton clicked");
  if (deferredEvent) {
    deferredEvent.prompt();
  } else {
    installButton.style.display = "none";
  }
});

//------------------------ Notifications ------------------------

async function requestNotificationPermission() {
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
  }
}

document.addEventListener("DOMContentLoaded", requestNotificationPermission);




//-------------------- Mønstre --------------------


const main = document.getElementById("app");

function newPattern (){
    main.innerHTML = `
    <form id="newPatternForm">
    <h2>Legg til en ny strikkeoppskrift</h2>

    <label for="name">Navn på oppskrift:</label>
    <input type="text" id="name" required>

    <label for="description">Beskrivelse:</label>
    <textarea id="description" required></textarea>

    <label for="difficulty">Vanskelighetsgrad:</label>
    <select id="difficulty" required>
        <option value="Lett">Lett</option>
        <option value="Middels">Middels</option>
        <option value="Vanskelig">Vanskelig</option>
    </select>

    <label for="category">Kategori:</label>
    <input type="text" id="category" required>

    <label>Størrelse:</label>
    <input type="text" id="sizes" placeholder="S, M, L, XL" >

    <label>Brystmål i cm:</label>
    <input type="text" id="chestWidthInCm" placeholder="90, 100, 110, 120" >

    <label>Strikkefasthet (antall masker per 10 cm):</label>
    <input type="number" id="gaugeStitches" required>

    <label>Materialer:</label>
    <div id="materialsContainer">
        <div class="material">
            <input type="text" class="material-type" placeholder="Type (f.eks. Garn)">
            <input type="text" class="material-name" placeholder="Navn (f.eks. Dale lerke)">
            <input type="text" class="material-amount" placeholder="Mengde (f.eks. 350g)">
        </div>
    </div>
    <button type="button" id="addMaterial">Legg til materiale</button>

    <label>Instruksjoner:</label>
    <div id="instructionsContainer">
        <div class="instruction">
            <input type="text" class="instruction-part" placeholder="Del (f.eks. Hals)">
            <textarea class="instruction-description" placeholder="Beskrivelse av denne delen"></textarea>
        </div>
    </div>
    <button type="button" id="addInstruction">Legg til instruksjon</button>

    <label for="image">Bilde-URL:</label>
    <input type="text" id="image">

    <label for="author">Forfatter:</label>
    <input type="text" id="author" required>

    <button type="submit">Lagre oppskrift</button>
</form>
        `;
}

async function showPatterns() {
    const response = await fetch("/patterns");
    const patterns = await response.json();
    console.log("patterns", patterns);
    main.innerHTML = `
    <h2>Strikkeoppskrifter</h2>
    <div id="patterns">
        ${patterns.map((pattern) => `
        <div class="pattern">
            <h3>${pattern.name}</h3>
            <p><strong><i>${pattern.description}</i></strong></p>
            <p><strong>Vanskelighetsgrad: </strong>${pattern.difficulty}</p>
            <p><strong>Kategori:</strong> ${pattern.category}</p>
            <p><strong>Størrelser:</strong> ${pattern.sizes}</p>
            <p><strong>Brystvidde i cm:</strong> ${pattern.chestWidthInCm}</p>
            <p><strong>Strikkefasthet: </strong>${pattern.gauge.stitches} masker per ${pattern.gauge.lengthInCm} cm.</p>
            <p><strong>Materialer:</strong></p>
            <ul>
            ${pattern.materials.map(m => `<li><i>${m.type}: </i>${m.name} (${m.amount || m.size})</li>`).join("")}
            </ul>
            <p><strong>Instruksjoner:</strong></p>
            <ul>
            ${pattern.instructions.map(i => `<li><i>${i.part}:</i> ${i.description}</li>`).join("")}</li>
            </ul>
            <img src="${pattern.image}" alt="${pattern.name}">
            <p><i>Forfatter: ${pattern.author}</i></p>
        </div>
        `).join("")}
    </div>
    `;
}


