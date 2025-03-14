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
      console.log("Navigerer til home");
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

  console.log("route", route);
}

document.addEventListener("DOMContentLoaded", () => {
  const navigate = document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const route = event.target.dataset.route;
      navigateTo(route);
    });
  });

  console.log("navigate", navigate);

  navigateTo("home");
});

main.addEventListener("addNewPattern", () => {
  console.log("addNewPattern event");
  navigateTo("addPattern");
});

main.addEventListener("showPatterns", () => {
  console.log("showPatterns event");
  navigateTo("patterns");
});



  

