"use strict";

 import { createPattern } from "../apiService.mjs";

//============= HTML =============
const addPatternViewHTML = `
<link href="css/style.css" rel="stylesheet">
<form id="newPatternForm">
    <h2>Legg til en ny strikkeoppskrift</h2>

    <label for="name">Navn på oppskrift:</label>
    <input type="text" id="name" required>

    <label for="description">Beskrivelse:</label>
    <textarea id="description" required></textarea>

    <label for="difficulty">Vanskelighetsgrad:</label>
    <select id="difficulty" required>
        <option value="Lett">Lett</option>
        <option value="Middels">Middels</option>
        <option value="Vanskelig">Vanskelig</option>
    </select>

    <label for="category">Kategori:</label>
    <input type="text" id="category" required>

    <label>Størrelse:</label>
    <input type="text" id="sizes" placeholder="S, M, L, XL" >

    <label>Brystmål i cm:</label>
    <input type="text" id="chestWidthInCm" placeholder="90, 100, 110, 120" >

    <label>Strikkefasthet (antall masker per 10 cm):</label>
    <input type="number" id="gaugeStitches" required="">

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
    <input type="text" id="author" required>

    <button type="submit" id="savePattern">Lagre oppskrift</button>
</form>
`;

//==================== Class ====================
export class AddPatternView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = addPatternViewHTML;
    this.form = this.shadowRoot.getElementById("newPatternForm");
    this.addMaterialButton = this.shadowRoot.getElementById("addMaterial");
    this.addInstructionButton = this.shadowRoot.getElementById("addInstruction");
    this.startEventListener();
  }

  startEventListener() {
    if(this.addMaterialButton){
      this.addMaterialButton.addEventListener("click", () => {
        console.log("addMaterialButton clicked");
        this.addMaterial();
      });
    };

    if(this.addInstructionButton){
      this.addInstructionButton.addEventListener("click", () => {
        console.log("addInstructionButton clicked");
        this.addInstruction();
      });
    };

    if(this.form){
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

        const newPatternData = {
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

        console.log("newPatternData", newPatternData);

        const addedPattern = await createPattern(newPatternData);
        console.log("addedPattern", addedPattern);
        const submitButton = this.shadowRoot.getElementById("savePattern");
        setTimeout(() => {
          submitButton.innerText = "Oppskrift lagret!";
          setTimeout(() => {
            submitButton.innerText = "Lagre oppskrift";
          }, 3000);
        }, 100);
      });

      console.log("addPatternView.js loaded");
    }else{
      console.error("Form not found");
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

customElements.define("add-pattern-view", AddPatternView);
