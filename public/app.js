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
