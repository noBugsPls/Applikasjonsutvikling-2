if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
}

import aboutViewHTML from "./views/aboutView.mjs";
import patternsViewHTML from "./views/patternsView.mjs";
import homeViewHTML from "./views/homeView.mjs";

const routes = {
  home: homeViewHTML,
  patterns: patternsViewHTML,
  about: aboutViewHTML,
};

async function navigate(route) {
  const app = document.getElementById("app");
  app.innerHTML = routes[route] || "<h2>Siden finnes ikke</h2>";
}

document.querySelectorAll("nav").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = event.target.dataset.route;
    navigate(route);
  });
});

navigate("home");

let deferredEvent;
let installButton = document.getElementById("installButton");

if(!deferredEvent) {
    installButton.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredEvent = event;
  if(deferredEvent) {
    installButton.style.display = 'block';
  }else{
    installButton.style.display = 'none';
  }
});

installButton.addEventListener('click', () => {
    console.log('installButton clicked');
  if(deferredEvent) {
    deferredEvent.prompt();
  }else{
    installButton.style.display = 'none';
  }
});
