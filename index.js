let searchType = "strict";
let searchTerm;

const SEARCH_LABEL = {
  strict: "Wyszukaj tablicę rejestracyjną",
  nonstrict: "Wyszukaj tablicę rejestracyjną",
  descr: "Wyszukaj tablicę rejestracyjną (min. 3 znaki)",
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setInputListener();
    setButtonsListeners();
  },
  false
);

function setInputListener() {
  const input = document.getElementById("text-input");
  input.addEventListener("input", (e) => {
    searchTerm = e.target.value.toUpperCase();
    search();
  });
}

function setButtonsListeners() {
  const buttons = document.getElementsByClassName("slds-button");
  [...buttons].forEach((button) => {
    button.addEventListener("click", (e) => {
      clickButton(e.target.id);
    });
  });
}

function setSearchLabels() {
  const inputLabel = document.getElementById("text-input-label");
  const input = document.getElementById("text-input");
  const label = SEARCH_LABEL[searchType];

  inputLabel.innerText = label;
  input.placeholder = label;
}

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
  setSearchLabels();
  search();
}

function search() {
  if (!searchTerm?.length) {
    const output = document.getElementById("output");
    output.innerHTML = "";
    return;
  }

  if (searchTerm?.length <= 2 && searchType === "descr") {
    return;
  }

  const filterToSearchType = {
    strict: (entry) => entry.plate === searchTerm,
    nonstrict: (entry) => entry.plate.startsWith(searchTerm),
    descr: (entry) => entry.district.toUpperCase().includes(searchTerm),
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
      result.push(...matched);
      if (matched.length) {
        result.push(`</article>`);
      }
    }
  });
  const html = result.join``;
  const output = document.getElementById("output");
  output.innerHTML = html;
}
