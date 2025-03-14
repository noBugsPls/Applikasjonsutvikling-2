"use strict";

//============= HTML =============
const homeViewHTML = `
<link href="css/style.css" rel="stylesheet">
<h1>Knitting Patterns</h1>
<p>Et sted hvor du kan oppbevare alle strikkeoppskriftene dine!</p>
<button id="newPattern">Legg til ny oppskrift</button>
<button id="showPatterns">Vis oppskrifter</button>
`;

//==================== Class ====================
export class HomeView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = homeViewHTML;
    this.homeContainer = this.shadowRoot.getElementById("homeContainer");
    this.newPatternButton = this.shadowRoot.getElementById("newPattern");
    this.showPatternsButton = this.shadowRoot.getElementById("showPatterns");
  }

  update(data) {
    this.newPatternButton.addEventListener("click", () => {
      console.log("Legg til ny oppskrift-knapp trykket på");
      const addPatternEvent = new CustomEvent("addNewPattern", {
        bubbles: true,
        composed: true,
      });
      const dispatched = this.dispatchEvent(addPatternEvent);
      console.log("Event dispatched:", dispatched);
    });

    this.showPatternsButton.addEventListener("click", () => {
      console.log("Vis oppskrifter");
      const showPatternEvent = new CustomEvent("showPatterns", {
        bubbles: true,
        composed: true,
      });
      const dispatched = this.dispatchEvent(showPatternEvent);
      console.log("Event dispatched:", dispatched);
    });
  }
}

customElements.define("home-view", HomeView);
