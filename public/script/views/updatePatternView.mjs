"use strict";

//============= HTML =============
const updatePatternViewHTML = `
<link href="css/style.css" rel="stylesheet">
<h1>Oppdater strikkeoppskrift</h1>
`;

//==================== Class ====================

export class UpdatePatternView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = updatePatternViewHTML;
  }

  async show() {
    console.log("show update pattern view");
  }
}

customElements.define("update-pattern-view", UpdatePatternView);
