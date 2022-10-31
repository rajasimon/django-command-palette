window.buttonData = [];
window.paletteComponent = document.createElement("div");
window.paletteComponent.classList.add("palette");

const paletteDatas = JSON.parse(
  document.getElementById("palette-data").textContent
);

function searchButton(query) {
  let searchedElements = [];
  window.buttonData.find((value, index) => {
    const thisButton = window.buttonData[index];
    if (thisButton.text.includes(query)) {
      const element = createButton(value);
      searchedElements.push(element);
    }
  });

  const paletteResultWindow = document.querySelector(".palette-result-window");
  paletteResultWindow.innerHTML = "";

  searchedElements.forEach((searchedElement) => {
    paletteResultWindow.appendChild(searchedElement);
  });
}

function createButton(data) {
  const buttonElement = document.createElement("div");
  buttonElement.classList.add("palette-button");
  buttonElement.addEventListener("click", function () {
    window.location.replace(data.admin_url);
  });

  const buttonWrapperElement = document.createElement("div");
  buttonWrapperElement.classList.add("palette-button-wrapper");

  const buttonWrapperTextElement = document.createElement("div");
  buttonWrapperTextElement.classList.add("palette-button-wrapper-text");
  buttonWrapperTextElement.innerHTML = data.text;

  buttonWrapperElement.appendChild(buttonWrapperTextElement);
  buttonElement.appendChild(buttonWrapperElement);
  return buttonElement;
}

function showDefaultList(resultElement) {
  for (let index = 0; index < paletteDatas.length; index++) {
    const paletteData = paletteDatas[index];
    for (let innerIndex = 0; innerIndex < paletteData.length; innerIndex++) {
      const data = paletteData[innerIndex];
      const buttonData = {
        key: `${index}`,
        text: `${data.name}`,
        admin_url: `${data.admin_url}`,
      };
      const element = createButton(buttonData);
      resultElement.appendChild(element);
      window.buttonData.push(buttonData);
    }
  }
}

function executePalette() {
  const palleteWindowElement = document.createElement("div");
  palleteWindowElement.setAttribute("tabindex", "0");
  palleteWindowElement.classList.add("palette-window");
  window.paletteComponent.appendChild(palleteWindowElement);

  const wrapperElement = document.createElement("div");
  palleteWindowElement.appendChild(wrapperElement);

  const inputElement = document.createElement("input");
  inputElement.classList.add("palette-input");
  inputElement.placeholder = "Type a command or search...";
  inputElement.onkeydown = function (event) {
    searchButton(event.target.value);
  };

  wrapperElement.appendChild(inputElement);

  const resultElement = document.createElement("div");
  resultElement.classList.add("palette-result-window");

  showDefaultList(resultElement);

  wrapperElement.appendChild(resultElement);
  console.log(document.body);
  document.body.appendChild(window.paletteComponent);

  // Below code is not working as expected. Input is not focusing when open
  inputElement.setAttribute("tabindex", "1");
  inputElement.focus();
}

document.addEventListener("DOMContentLoaded", executePalette, false);

document.addEventListener("keydown", function (event) {
  if (event.metaKey === true && event.key == "k") {
    event.preventDefault();

    window.paletteComponent.style.display =
      window.paletteComponent.style.display === "flex" ? "none" : "flex";
  }
});
