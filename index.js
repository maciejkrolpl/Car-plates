document.addEventListener(
  "DOMContentLoaded",
  () => {
    const input = document.getElementById("text-input-id-47");
    input.addEventListener("input", (e) => {
      search(e.target.value.toUpperCase());
    });
  },
  false
);

function search(typed) {
  let result = [];
  [polish, ukrainian, german].forEach((country) => {
    const matched = country.entries
      .filter((entry) => entry.plate === typed)
      .map((plate) => {
        return `<div class="slds-card__body slds-card__body_inner"><b>${plate.plate}</b> - ${plate.district}</div>`
      });

    if (matched.length) {
      result.push(
        `<article class="slds-card">
  <div class="slds-card__header slds-grid">
    <header class="slds-media slds-media_center slds-has-flexi-truncate">
      <div class="slds-media__figure">
        <span class="slds-icon_container" title="${country.label}">
          <img src="flags/${country.name}.svg" class="flag-image">
          </svg>
          <span class="slds-assistive-text">${country.name}</span>
        </span>
      </div>
      <div class="slds-media__body">
        <h2 class="slds-card__header-title">
          <a href="#" class="slds-card__header-link slds-truncate" title="${country.label}">
            <span>${country.label}</span>
          </a>
        </h2>
      </div>
    </header>
  </div>`
      );
      result.push([...matched]);
      if (matched.length) {
        result.push(`</article>`);
      }
    }
  });
  const html = result.join``;
  const output = document.getElementById("output");
  output.innerHTML = html;
}
