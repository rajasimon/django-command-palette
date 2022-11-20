window.paletteComponent = document.createElement("div");
window.paletteComponent.classList.add("palette");

const paletteDatas = JSON.parse(
  document.getElementById("palette-data").textContent
);

function getUrlFromName(name) {
  for (let index = 0; index < paletteDatas.length; index++) {
    const paletteData = paletteDatas[index];
    for (let innerIndex = 0; innerIndex < paletteData.length; innerIndex++) {
      const data = paletteData[innerIndex];
      if (name === data.name) {
        return data.admin_url
      }
    }
  }
  console.error(`${name} not found in paletteDatas`);
}

function moveSelected(direction) {
  const paletteResultWindowArray = Array.prototype.slice.call(
    document.querySelector(".palette-result-window").children
  );
  const selected = document.querySelector(".palette-button.selected");
  const position = paletteResultWindowArray.indexOf(selected);

  // Scroll down if not already at the end
  if (direction === "down" && position + 1 < paletteResultWindowArray.length) {
    selected.classList.remove("selected");
    paletteResultWindowArray[position + 1].classList.add("selected");
    // Make the sure the new selected element is scrolled into view
    paletteResultWindowArray[position + 1].scrollIntoView({block: "nearest"});
  }

  // Scroll up if not already at the beginning
  if (direction === "up" && position - 1 >= 0) {
    selected.classList.remove("selected");
    paletteResultWindowArray[position - 1].classList.add("selected");
    // Make the sure the new selected element is scrolled into view
    paletteResultWindowArray[position - 1].scrollIntoView({block: "nearest"});
  }
}

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
          firstSearchStateBool = true;
        } else {
          buttonData["default"] = false;
        }
        searchedData.push(buttonData);
        const element = createButton(buttonData);
        resultElement.appendChild(element);
      }
    }
  }

  // Make the sure the first/selected element is scrolled into view
  resultElement.firstChild.scrollIntoView({block: "nearest"});
}

function handleEnter() {
  const selected = document.querySelector(".palette-button.selected");
  const url = getUrlFromName(selected.textContent);
  window.location.replace(url);
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
      if (index === 0 && innerIndex === 0) {
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
  inputElement.id = "paletteInput";
  inputElement.classList.add("palette-input");
  inputElement.placeholder = "Type a command or search...";
  inputElement.onkeyup = function (event) {
    if (event.key === "Enter") {
      handleEnter();
      return;
    }
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) {
      searchQuery(event.target.value);
    }
  };

  wrapperElement.appendChild(inputElement);

  const resultElement = document.createElement("div");
  resultElement.classList.add("palette-result-window");

  wrapperElement.appendChild(resultElement);
  document.body.appendChild(window.paletteComponent);

  showDefaultList();
}

document.addEventListener("DOMContentLoaded", executePalette, false);

document.addEventListener("keydown", (event) => {
  const paletteIsVisible = window.paletteComponent.style.display === "flex"

  if (event.metaKey && event.key === "k") {
    window.paletteComponent.style.display = paletteIsVisible ? "none" : "flex";
    document.getElementById("paletteInput").focus();
  }

  if (!paletteIsVisible) {
    return;
  }

  if (event.key == "Escape") {
    window.paletteComponent.style.display = "none";
  }

  if (event.key == "ArrowUp") {
    moveSelected("up");
  }

  if (event.key == "ArrowDown") {
    moveSelected("down");
  }
});
