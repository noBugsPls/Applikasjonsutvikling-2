if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

import aboutViewHTML from "./views/aboutView.mjs";
import patternsViewHTML from "./views/patternsView.mjs";
import homeViewHTML from "./views/homeView.mjs";
import licenseViewHTML from "./views/licenseView.mjs";
import { AddPatternView } from "./views/addPatternView.mjs";

//------------------------ Navigation ------------------------
const routes = {
  home: homeViewHTML,
  patterns: patternsViewHTML,
  about: aboutViewHTML,
  license: licenseViewHTML,
  addPattern: () => new AddPatternView().show(),
};

async function navigate(route) {
  const app = document.getElementById("app");

  if (typeof routes[route] === "function") {
    routes[route]();
  } else {
    app.innerHTML = routes[route] || "<h2>Siden finnes ikke</h2>";
  }

  if (route === "patterns") {
    await showPatterns();
  } else if (route === "home") {
    document.getElementById("newPattern").addEventListener("click", () => navigate("addPattern"));
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

 export async function showPatterns() {
  const response = await fetch("/patterns");
  console.log("response", response);
  if(!response.ok) {
    console.error("Error fetching patterns", response);
    return;
  }

  const isHTML = response.headers.get("content-type").includes("text/html");
  if(isHTML) {

  }

  const patterns = await response.json();
  
  console.log("patterns", patterns);
  main.innerHTML = `
    <h2>Strikkeoppskrifter</h2>
    <div id="patterns">
        ${patterns
          .map(
            (pattern) => `
        <div class="pattern">
          <hr>
            <h3>${pattern.name}</h3>
            <p><strong><i>${pattern.description}</i></strong></p>
            <p><strong>Vanskelighetsgrad: </strong>${pattern.difficulty}</p>
            <p><strong>Kategori:</strong> ${pattern.category}</p>
            ${pattern.sizes.some(size => size.trim() !=="") ? `<p><strong>Størrelser:</strong> ${pattern.sizes.join(", ")}</p>` : ""}
            ${pattern.chest_width_in_cm === 0 ? `<p><strong>Brystvidde i cm:</strong> ${pattern.chest_width_in_cm}</p>` : ""}
            <p><strong>Strikkefasthet: </strong>${pattern.gauge.stitches} masker per 10 cm.</p>
            ${pattern.materials.some(material => (material.amount && material.amount.trim !== "") || (material.name && material.name.trim !== "") || (material.type && material.type.trim !== "")
            ) ? `<p><strong>Materialer:</strong></p>` : ""}
            ${pattern.materials !== "" && pattern.materials.length 
            ? `
               <ul>
                 ${pattern.materials.map(m => m.type || m.name ? `<li><i>${m.type}: </i>${m.name} ${m.amount || m.size ? `(${m.amount || m.size})` : ""}</li>` : "").join("")}
               </ul>` 
            : ""}
            ${pattern.instructions.some(instructions => ((instructions.description && instructions.description.trim() !== "") || (instructions.part && instructions.part.trim() !== ""))) ? `<p><strong>Instruksjoner:</strong></p>` : ""}
             ${pattern.instructions && pattern.instructions.length
            ? `
               <ul>
                 ${pattern.instructions.map(instructions => instructions.part || instructions.description ? `<li><i>${instructions.part}:</i> ${instructions.description}</li>` : "").join("")}
               </ul>` 
            : ""}
            ${pattern.image ? `<img src="${pattern.image}" alt="${pattern.name}">` : ""}
            <p><i>Forfatter: ${pattern.author}</i></p>
        </div>
        <button id="updatePattern">Endre oppskrift</button>
        <button id="deletePattern">Slett oppskrift</button>
        `
          )
          .join("")}
    </div>
    `;
} 
