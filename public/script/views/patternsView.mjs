"use strict";

import { getPatterns, deletePattern } from "../apiService.mjs";

//============= HTML =============
const patternsViewHTML = `
<link href="/css/style.css" rel="stylesheet">
<h1>Strikkeoppskrifter</h1>
<div id="patternsContainer"></div>
`;

//==================== Class ====================
export class PatternsView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = patternsViewHTML;
    this.patternsContainer = this.shadowRoot.getElementById("patternsContainer");
    this.loadPatterns();
  }

  async loadPatterns() {
    try {
      const patterns = await getPatterns();
      this.update(patterns);
    } catch (error) {
      console.error(error);
    }
  }

  update(data) {
    this.patternsContainer.innerHTML = "";
    data.forEach((pattern) => {
      const patternDiv = document.createElement("div");
      patternDiv.className = "pattern";
      patternDiv.innerHTML = `
               <hr>
                  <h3>${pattern.name}</h3>
                  <p><strong><i>${pattern.description}</i></strong></p>
                  <p><strong>Vanskelighetsgrad: </strong>${pattern.difficulty}</p>
                  <p><strong>Kategori:</strong> ${pattern.category}</p>
                  ${
                    pattern.sizes.some((size) => size.trim() !== "")
                      ? `<p><strong>Størrelser:</strong> ${pattern.sizes.join(", ")}</p>`
                      : ""
                  }
                  ${
                    pattern.chest_width_in_cm === 0
                      ? `<p><strong>Brystvidde i cm:</strong> ${pattern.chest_width_in_cm}</p>`
                      : ""
                  }
                  <p><strong>Strikkefasthet: </strong>${pattern.gauge.stitches} masker per 10 cm.</p>
                  ${
                    pattern.materials.some(
                      (material) =>
                        (material.amount && material.amount.trim !== "") ||
                        (material.name && material.name.trim !== "") ||
                        (material.type && material.type.trim !== "")
                    )
                      ? `<p><strong>Materialer:</strong></p>`
                      : ""
                  }
                  ${
                    pattern.materials !== "" && pattern.materials.length
                      ? `
                     <ul>
                       ${pattern.materials
                         .map((m) =>
                           m.type || m.name
                             ? `<li><i>${m.type}: </i>${m.name} ${
                                 m.amount || m.size ? `(${m.amount || m.size})` : ""
                               }</li>`
                             : ""
                         )
                         .join("")}
                     </ul>`
                      : ""
                  }
                  ${
                    pattern.instructions.some(
                      (instructions) =>
                        (instructions.description && instructions.description.trim() !== "") ||
                        (instructions.part && instructions.part.trim() !== "")
                    )
                      ? `<p><strong>Instruksjoner:</strong></p>`
                      : ""
                  }
                   ${
                     pattern.instructions && pattern.instructions.length
                       ? `
                     <ul>
                       ${pattern.instructions
                         .map((instructions) =>
                           instructions.part || instructions.description
                             ? `<li><i>${instructions.part}:</i> ${instructions.description}</li>`
                             : ""
                         )
                         .join("")}
                     </ul>`
                       : ""
                   }
                  ${pattern.image ? `<img src="${pattern.image}" alt="${pattern.name}">` : ""}
                  <p><i>Forfatter: ${pattern.author}</i></p>
                <button class="updatePattern" data-id="${pattern.id}">Endre oppskrift</button>
        <button class="deletePattern" data-id="${pattern.id}">Slett oppskrift</button>
              </div>
              `;
      this.patternsContainer.appendChild(patternDiv);
    });

    const updateButtons = this.shadowRoot.querySelectorAll(".updatePattern");
    updateButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("Endre oppskrift-knapp trykket på", button.dataset.id);
        const updatePatternEvent = new CustomEvent("updatePattern", {
          detail: { id: button.dataset.id },
          bubbles: true,
          composed: true,
        });
        const dispatched = this.dispatchEvent(updatePatternEvent);
        console.log("Event dispatched:", dispatched);
      });
    });

    const deleteButtons = this.shadowRoot.querySelectorAll(".deletePattern");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        console.log("Slett oppskrift-knapp trykket på", button.dataset.id);
        const id = parseInt(button.dataset.id, 10);

        const confirmWindow = confirm("Er du sikker på at du vil slette denne oppskriften?");
        if (!confirmWindow) {
          return;
        }
        try {
          await deletePattern(id);
          const updatedPatterns = await getPatterns();
          this.update(updatedPatterns);
        } catch (error) {
          console.error(error);
        }
      });
    });
  }
}

customElements.define("patterns-view", PatternsView);
