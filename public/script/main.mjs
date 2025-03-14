import { HomeView } from "./views/homeView.mjs";
import { AboutView } from "./views/aboutView.mjs";
import { LicenseView } from "./views/licenseView.mjs";
import { AddPatternView } from "./views/addPatternView.mjs";
import { PatternsView } from "./views/patternsView.mjs";
import { UpdatePatternView } from "./views/updatePatternView.mjs";
import { getPatterns } from "./apiService.mjs";

const main = document.getElementById("app");
const homeView = new HomeView();
const aboutView = new AboutView();
const licenseView = new LicenseView();
const addPatternView = new AddPatternView();
const patternsView = new PatternsView();
const updatePatternView = new UpdatePatternView();

main.innerHTML = "";
main.appendChild(homeView);
navigateTo("home");

async function navigateTo(route) {
  main.innerHTML = "";
  switch (route) {
    case "home":
      main.appendChild(homeView);
      homeView.update();
      break;
    case "patterns":
      main.appendChild(patternsView);
      patternsView.update(await getPatterns());
      break;
    case "about":
      main.appendChild(aboutView);
      break;
    case "license":
      main.appendChild(licenseView);
      break;
    case "addPattern":
      main.appendChild(addPatternView);
      break;
    case "updatePattern":
      main.appendChild(updatePatternView);
      break;
    default:
      main.innerHTML = "<h2>Siden finnes ikke</h2>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navigate = document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const route = event.target.dataset.route;
      navigateTo(route);
    });
  });
  navigateTo("home");
  const installButton = document.getElementById("installButton");
  if (!installButton) {
  }
  //Kode fra "What PWA Can Do Today" - https://whatpwacando.today/installation----- start
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    installButton.style.display = "block";
  });

  installButton.addEventListener("click", async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
    } else {
      installButton.style.display = "none";
    }
  });
  //Kode fra "What PWA Can Do Today" - https://whatpwacando.today/installation----- slutt
});

main.addEventListener("addNewPattern", () => {
  navigateTo("addPattern");
});

main.addEventListener("showPatterns", () => {
  getPatterns();
  navigateTo("patterns");
});

main.addEventListener("updatePattern", (event) => {
  const id = event.detail.id;
  updatePatternView.getCorrectId(id);
  navigateTo("updatePattern");
});

main.addEventListener("patternUpdated", (event) => {
  getPatterns();
  navigateTo("patterns");
});
