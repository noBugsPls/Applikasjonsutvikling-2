"use strict";

//============= HTML =============

const aboutViewHTML = `
<link href="css/style.css" rel="stylesheet">
<img src="./images/Strikkemonster_Logo.png" alt="Logo">
    <p id="pictureText">Bilde laget av ChatGPT.</p>
    <h1>Om nettsiden</h1>
    <p>
    Dette er en nettside for deg som liker å strikke. Tanken bak nettsiden er at du selv kan legge inn oppskrifter som du vil ha tilgjengelig. Vi vet alle at garn kan hope seg opp i flertall, og når det skjer er det viktig å ha utallige strikkemønstre/oppskrifter tilgjengelig.
    </p>
    <p>
    Nettsiden er laget av en student som har interesse for strikking. Nettsiden er laget som et prosjekt i emnet "Applikasjonsutvikling 2". 
    </p>
`;

//==================== Class ====================
export class AboutView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = aboutViewHTML;
    this.aboutContainer = this.shadowRoot.getElementById("aboutContainer");
  }
}

customElements.define("about-view", AboutView);
