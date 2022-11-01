window.paletteComponent = document.createElement("div");
window.paletteComponent.classList.add("palette");

const paletteDatas = JSON.parse(
  document.getElementById("palette-data").textContent
);

function searchQuery(query) {
  if (!query) {
    showDefaultList();
    return;
  }

  let searchedData = [];
  let firstSearchStateBool = false;

  const resultElement = document.querySelector(".palette-result-window");
  resultElement.innerHTML = "";

  for (let index = 0; index < paletteDatas.length; index++) {
    const paletteData = paletteDatas[index];
    for (let innerIndex = 0; innerIndex < paletteData.length; innerIndex++) {
      const data = paletteData[innerIndex];
      const buttonData = {
        key: `${index}`,
        text: `${data.name}`,
        admin_url: `${data.admin_url}`,
      };

      if (data.name.toLowerCase().includes(query.toLowerCase())) {
        if (!firstSearchStateBool) {
          buttonData["default"] = true;
          firstSearchStateBool = false;
        }
        searchedData.push(buttonData);
        const element = createButton(buttonData);
        resultElement.appendChild(element);
      }
    }
  }
}

function enterQuery(query) {
  let firstSearchStateBool = false;
  for (let index = 0; index < paletteDatas.length; index++) {
    const paletteData = paletteDatas[index];
    for (let innerIndex = 0; innerIndex < paletteData.length; innerIndex++) {
      const data = paletteData[innerIndex];
      const buttonData = {
        key: `${index}`,
        text: `${data.name}`,
        admin_url: `${data.admin_url}`,
      };

      if (!query) {
        if (!firstSearchStateBool) {
          firstSearchStateBool = true;
          window.location.replace(buttonData.admin_url);
        }
      } else {
        if (data.name.toLowerCase().includes(query.toLowerCase())) {
          if (!firstSearchStateBool) {
            firstSearchStateBool = true;
            window.location.replace(buttonData.admin_url);
          }
        }
      }
    }
  }
}

function createButton(data) {
  const buttonElement = document.createElement("div");
  buttonElement.classList.add("palette-button");
  if (data.default === true) {
    buttonElement.classList.add("selected");
  }

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

function showDefaultList() {
  const resultElement = document.querySelector(".palette-result-window");
  resultElement.innerHTML = "";

  for (let index = 0; index < paletteDatas.length; index++) {
    const paletteData = paletteDatas[index];
    for (let innerIndex = 0; innerIndex < paletteData.length; innerIndex++) {
      const data = paletteData[innerIndex];
      const buttonData = {
        key: `${index}`,
        text: `${data.name}`,
        admin_url: `${data.admin_url}`,
      };
      if (innerIndex === 0) {
        buttonData["default"] = true;
      } else {
        buttonData["default"] = false;
      }
      const element = createButton(buttonData);
      resultElement.appendChild(element);
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
  inputElement.onkeyup = function (event) {
    if (event.key === "Enter") {
      enterQuery(event.target.value);
    }
    searchQuery(event.target.value);
  };

  wrapperElement.appendChild(inputElement);

  const resultElement = document.createElement("div");
  resultElement.classList.add("palette-result-window");

  wrapperElement.appendChild(resultElement);
  document.body.appendChild(window.paletteComponent);

  showDefaultList();
}

document.addEventListener("DOMContentLoaded", executePalette, false);

document.addEventListener("keydown", function (event) {
  if (event.metaKey === true && event.key == "k") {
    event.preventDefault();

    window.paletteComponent.style.display =
      window.paletteComponent.style.display === "flex" ? "none" : "flex";
  }
});
