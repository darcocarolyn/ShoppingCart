let button = document.getElementById("add-button");
let inputFieldEl = document.getElementById("input-field");
let shoppingListEl = document.getElementById("shopping-list");

let itemArray = getItemArrayFromLocalStorage(); // Load saved items from local storage

button.addEventListener("click", function() {
    addItem();
    clearInputFieldEl();
});

function addItem() {
    let newItem = document.createElement("li");
    newItem.textContent = inputFieldEl.value;

    if (inputFieldEl.value == ""){
        removeItem(this.textContent);
    } else 
    itemArray.push(inputFieldEl.value);

    saveItemArrayToLocalStorage(); // Save updated items to local storage
    updateShoppingList();
    
    newItem.addEventListener("click", function() {
        removeItem(this.textContent);
    });
}

    const deleteMessage = document.getElementById("deleteBox")
    const yesBtn = document.getElementById("yesBtn")
    const noBtn = document.getElementById("noBtn") 
    
function removeItem(item) {
    let index = itemArray.indexOf(item);
    const deleteMessage = document.getElementById("deleteBox");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
  
    if (index !== -1) {
        deleteMessage.style.display = "block";
        yesBtn.addEventListener("click", yesHandler);
        noBtn.addEventListener("click", noHandler);
      }

    function yesHandler() {
      console.log("Item deleted!");
      itemArray.splice(index, 1);
      saveItemArrayToLocalStorage();
      updateShoppingList();
      deleteMessage.style.display = "none";
  
      // Remove event listeners after use
      yesBtn.removeEventListener("click", yesHandler);
      noBtn.removeEventListener("click", noHandler);
    };
  
    function noHandler () {
      console.log("Item kept!");
      deleteMessage.style.display = "none";
  
      // Remove event listeners after use
      yesBtn.removeEventListener("click", yesHandler);
      noBtn.removeEventListener("click", noHandler);
    };

  }
    

function updateShoppingList() {
    shoppingListEl.innerHTML = ""; // Clear the list

    for (let item of itemArray) {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        
        listItem.addEventListener("click", function() {
            removeItem(item);
        });

        shoppingListEl.appendChild(listItem);
    }
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function saveItemArrayToLocalStorage() {
    localStorage.setItem("shoppingListItems", JSON.stringify(itemArray));
}

function getItemArrayFromLocalStorage() {
    let storedItems = localStorage.getItem("shoppingListItems");
    return storedItems ? JSON.parse(storedItems) : [];
}

// Call this function when the page loads to populate the shopping list
updateShoppingList();