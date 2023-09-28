let searchType = "strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const input = document.getElementById("text-input-id-47");
    input.addEventListener("input", (e) => {
      search(e.target.value.toUpperCase());
    });

    const buttons = document.getElementsByClassName("slds-button");
    [...buttons].forEach((button) => {
      button.addEventListener("click", (e) => {
        clickButton(e.target.id);
      });
    });
  },
  false
);

function clickButton(clickedId) {
  const buttons = document.getElementsByClassName("slds-button");
  [...buttons].forEach((button) => {
    const currentId = button.id;
    if (clickedId === currentId) {
      searchType = clickedId;
      button.classList.add("slds-button_brand");
      button.classList.remove("slds-button_neutral");
    } else {
      button.classList.remove("slds-button_brand");
      button.classList.add("slds-button_neutral");
    }
  });
}

function search(typed) {
  if (!typed?.length) {
    const output = document.getElementById("output");
    output.innerHTML = "";
    return;
  }

  const filterToSearchType = {
    strict: (entry) => entry.plate === typed,
    nonstrict: (entry) => entry.plate.startsWith(typed),
    descr: (entry) => entry.district.toUpperCase().includes(typed),
  };

  const result = [];
  const filter = filterToSearchType[searchType];

  [polish, ukrainian, german].forEach((country) => {
    const matched = country.entries.filter(filter).map((plate) => {
      return `<div class="slds-card__body slds-card__body_inner"><b>${plate.plate}</b> - ${plate.district}</div>`;
    });

    if (matched.length) {
      result.push(
        `
<article class="slds-card">
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
