let items = [];

const textInput = document.getElementById("todo-input");

const submitButton = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");

const itemsContainer = document.getElementById("todo-items-container");
const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

if (itemsFromLocalStorage) {
  items = itemsFromLocalStorage;
  renderItems(items);
}

textInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (textInput.value === "") {
      console.log("No text input!");
      return;
    }

    items.push(textInput.value);
    localStorage.setItem("items", JSON.stringify(items));

    renderItems(items);

    clearInput();
  }
});

submitButton.addEventListener("click", function () {
  if (textInput.value === "") {
    console.log("No text input!");
    return;
  }

  items.push(textInput.value);
  localStorage.setItem("items", JSON.stringify(items));

  renderItems(items);

  clearInput();
});

function renderItems(items) {
  // Clear the container first
  itemsContainer.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-div";

    const itemText = document.createElement("p");
    itemText.textContent = items[i];
    itemText.className = "item";

    const deleteBtnText = document.createElement("button");
    deleteBtnText.textContent = "🗑️";
    deleteBtnText.className = "delete-btn";

    itemDiv.appendChild(itemText);
    itemText.appendChild(deleteBtnText);
    itemsContainer.appendChild(itemDiv);
  }
}

clearBtn.addEventListener("click", function () {
  itemsContainer.textContent = "";
  items = [];
  localStorage.removeItem("items");
});

itemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentNode.remove();
    const itemToRemove = event.target.parentNode.firstChild.textContent;
    const indexToRemove = items.indexOf(itemToRemove);
    if (Array.isArray(items)) {
      items.splice(indexToRemove, 1);
      localStorage.setItem("items", JSON.stringify(items));
    }
  } else if (event.target.classList.contains("item")) {
    const itemText = event.target;
    if (itemText.style.textDecoration === "line-through") {
      itemText.style.textDecoration = "none";
      itemText.style.color = "lightgreen";
    } else {
      itemText.style.textDecoration = "line-through";
      itemText.style.color = "#FF7F7F";
    }
  }
});

function clearInput() {
  textInput.value = "";
}
