"use strict";

//============= HTML =============
const licenseViewHTML = `
<link href="css/style.css" rel="stylesheet">
<h2>Lisenser</h2>
<br>
<h3>Lisens til appens logo</h3>
<p>Logo laget av <a href="https://thenounproject.com/icon/knitting-7435438/" title="Color Combo">Color Combo</a> fra <a href="https://thenounproject.com/" title="The Noun Project">www.thenounproject.com</a> med ID #7435438 <br>
<img src="/icons/knitting_small.png" alt="knitting-logo"> 
</p>
`;

//==================== Class ====================

export class LicenseView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = licenseViewHTML;
  }
}

customElements.define("license-view", LicenseView);
