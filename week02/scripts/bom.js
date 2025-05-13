// Select the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); 

function addListItem(event) {
    // Check if the input field is empty
    if (input.value.trim() !== '') {
        // Create a new li element
        const li = document.createElement('li');

        // Create a new button element
        const deleteButton = document.createElement('button');

        // Set the text content of the li element to the value of the input
        li.textContent = input.value;

        // Set the text content of the button element to '❌'
        deleteButton.textContent = '❌';

        // Add an event listener to the button to remove the li element when clicked
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Append the button to the li element
        li.append(deleteButton);

        // Append the li element to the list
        list.append(li);

        // Clear the input field
        input.value = '';
    }

    // Set focus to the input field
    input.focus();
  }

button.addEventListener('click', addListItem);
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Call the addListItem function
        addListItem(event);
    }
});








