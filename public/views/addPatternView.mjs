import { showPatterns } from "../app.js";

const addPatternViewHTML = `
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

export class AddPatternView {
  constructor() {
    this.main = document.getElementById("app");
  }

  async show() {
    this.main.innerHTML = addPatternViewHTML;

    const form = document.getElementById("newPatternForm");
    console.log("form:", form);

    const addMaterialButton = document.getElementById("addMaterial");
    addMaterialButton.addEventListener("click", () => {
      console.log("addMaterialButton clicked");
      const materialsContainer = document.getElementById("materialsContainer");
      const material = document.querySelector(".material");

      const newMaterial = material.cloneNode(true);
      newMaterial.querySelectorAll("input").forEach((input) => (input.value = ""));
      materialsContainer.appendChild(newMaterial);
    });

    const addInstructionButton = document.getElementById("addInstruction");
    addInstructionButton.addEventListener("click", () => {
      console.log("addInstructionButton clicked");
      const instructionsContainer = document.getElementById("instructionsContainer");
      const instruction = document.querySelector(".instruction");

      const newInstruction = instruction.cloneNode(true);
      newInstruction.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));
      instructionsContainer.appendChild(newInstruction);
    });

    if (form) {
      form.addEventListener("submit", async (event) => {
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
          }});

        const newPatternData = {
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          difficulty: document.getElementById("difficulty").value,
          category: document.getElementById("category").value,
          sizes: document
            .getElementById("sizes")
            .value.split(",")
            .map((size) => size.trim()),
          chestWidthInCm: document.getElementById("chestWidthInCm").value.split(",").map(Number),
          gauge: {
            stitches: parseInt(document.getElementById("gaugeStitches").value, 10),
            lengthInCm: 10,
          },
          materials: materials,
          instructions: instructions,
          image: document.getElementById("image").value,
          author: document.getElementById("author").value,
        };

        console.log("newPatternData", newPatternData);

        try {
          const response = await fetch("/patterns", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPatternData),
          });
          console.log("response i createpattern", response);
          if (response.ok) {
            console.log("Pattern created");
            showPatterns();
          } else {
            console.error("Error creating pattern", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error creating pattern", error);
        }
      });

      console.log("addPatternView.js loaded");
    } else {
      console.error("Form not found");
    }
  }
}
