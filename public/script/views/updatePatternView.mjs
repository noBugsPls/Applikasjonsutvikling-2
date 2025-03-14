"use strict";

import { getPatternById, updatePattern } from "../apiService.mjs";

//============= HTML =============
const updatePatternViewHTML = `
<link href="css/style.css" rel="stylesheet">
<form id="updatePatternForm">
<h1>Oppdater strikkeoppskrift</h1>

    <label for="name">Navn på oppskrift:</label>
    <input type="text" id="name">

    <label for="description">Beskrivelse:</label>
    <textarea id="description"></textarea>

    <label for="difficulty">Vanskelighetsgrad:</label>
    <select id="difficulty">
        <option value="Lett">Lett</option>
        <option value="Middels">Middels</option>
        <option value="Vanskelig">Vanskelig</option>
    </select>

    <label for="category">Kategori:</label>
    <input type="text" id="category">

    <label>Størrelse:</label>
    <input type="text" id="sizes" placeholder="S, M, L, XL" >

    <label>Brystmål i cm:</label>
    <input type="text" id="chestWidthInCm" placeholder="90, 100, 110, 120" >

    <label>Strikkefasthet (antall masker per 10 cm):</label>
    <input type="number" id="gaugeStitches">

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
    <input type="text" id="author">

    <button type="submit" id="updatePattern">Lagre oppskrift</button>
</form>
`;

//==================== Class ====================

export class UpdatePatternView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = updatePatternViewHTML;
    this.form = this.shadowRoot.getElementById("updatePatternForm");
    this.addMaterialButton = this.shadowRoot.getElementById("addMaterial");
    this.addInstructionButton = this.shadowRoot.getElementById("addInstruction");
    this.startEventListener();
  }

  async getCorrectId(id) {
    this.patternId = await getPatternById(id);
    await this.fillInForm(this.patternId);
  }

  async fillInForm(pattern) {
    this.shadowRoot.getElementById("name").value = pattern.name || "";
    this.shadowRoot.getElementById("description").value = pattern.description || "";
    this.shadowRoot.getElementById("difficulty").value = pattern.difficulty || "";
    this.shadowRoot.getElementById("category").value = pattern.category || "";
    this.shadowRoot.getElementById("sizes").value = pattern.sizes || "";
    this.shadowRoot.getElementById("chestWidthInCm").value = pattern.chestWidthInCm || "";
    if (pattern.gauge && pattern.gauge.stitches) {
      this.shadowRoot.getElementById("gaugeStitches").value = pattern.gauge.stitches;
    } else {
      this.shadowRoot.getElementById("gaugeStitches").value = "";
    }
    this.shadowRoot.getElementById("image").value = pattern.image || "";
    this.shadowRoot.getElementById("author").value = pattern.author || "";
  }

  startEventListener() {
    if (this.addMaterialButton) {
      this.addMaterialButton.addEventListener("click", () => {
        this.addMaterial();
      });
    }

    if (this.addInstructionButton) {
      this.addInstructionButton.addEventListener("click", () => {
        this.addInstruction();
      });
    }

    if (this.form) {
      this.form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const materialsElements = document.querySelectorAll("#materialsContainer .material");
        const materials = [];
        materialsElements.forEach((materialElement) => {
          const type = materialElement.querySelector(".material-type").value;
          const name = materialElement.querySelector(".material-name").value;
          const amount = materialElement.querySelector(".material-amount").value;
          if (type || name || amount) {
            materials.push({ type, name, amount });
          }
        });

        const instructionsElements = document.querySelectorAll("#instructionsContainer .instruction");
        const instructions = [];
        instructionsElements.forEach((instructionElement) => {
          const part = instructionElement.querySelector(".instruction-part").value;
          const description = instructionElement.querySelector(".instruction-description").value;
          if (part || description) {
            instructions.push({ part, description });
          }
        });

        const updatedPatternData = {
          name: this.shadowRoot.getElementById("name").value,
          description: this.shadowRoot.getElementById("description").value,
          difficulty: this.shadowRoot.getElementById("difficulty").value,
          category: this.shadowRoot.getElementById("category").value,
          sizes: this.shadowRoot
            .getElementById("sizes")
            .value.split(",")
            .map((size) => size.trim()),
          chest_width_in_cm: this.shadowRoot.getElementById("chestWidthInCm").value.split(",").map(Number),
          gauge: {
            stitches: parseInt(this.shadowRoot.getElementById("gaugeStitches").value, 10),
            lengthInCm: 10,
          },
          materials: materials,
          instructions: instructions,
          image: this.shadowRoot.getElementById("image").value,
          author: this.shadowRoot.getElementById("author").value,
        };

        const patternId = this.patternId;

        const updatedPattern = await updatePattern(patternId, updatedPatternData);

        const updateEvent = new CustomEvent("patternUpdated", {
          bubbles: true,
        });
        this.dispatchEvent(updateEvent);
      });
    }
  }

  addMaterial() {
    const materialsContainer = this.shadowRoot.getElementById("materialsContainer");
    const material = this.shadowRoot.querySelector(".material");

    if (materialsContainer && material) {
      const newMaterial = material.cloneNode(true);
      newMaterial.querySelectorAll("input").forEach((input) => (input.value = ""));
      materialsContainer.appendChild(newMaterial);
    }
  }

  addInstruction() {
    const instructionsContainer = this.shadowRoot.getElementById("instructionsContainer");
    const instruction = this.shadowRoot.querySelector(".instruction");

    if (instructionsContainer && instruction) {
      const newInstruction = instruction.cloneNode(true);
      newInstruction.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));
      instructionsContainer.appendChild(newInstruction);
    }
  }
}

customElements.define("update-pattern-view", UpdatePatternView);
