// Select the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const storageKey = 'myFavBOMList';

let chaptersArray = getChapterList() || [];
chaptersArray.forEach(chapter => {
    displayChapter(chapter);
});

function displayChapter(item) {
    // Create a new li element
    const li = document.createElement('li');

    // Create a new button element
    const deleteButton = document.createElement('button');

    // Set the text content of the li element to the value of the input
    li.textContent = item;

    // Set the text content of the button element to '❌'
    deleteButton.textContent = '❌';

    // Add an event listener to the button to remove the li element when clicked
    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        // Remove the chapter from the array and localStorage.
        deleteChapter(li.textContent); 
        input.focus();
    });

    // Append the button to the li element
    li.append(deleteButton);

    // Append the li element to the list
    list.append(li);
}

function setChapterList() {
    localStorage.setItem(storageKey, JSON.stringify(chaptersArray));
}
  
function getChapterList() {
    return JSON.parse(localStorage.getItem(storageKey));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
  }

button.addEventListener('click', () => {
    // Check if the input field is empty
    if (input.value.trim() !== '') {

        // call the function that outputs the submitted chapter    
        displayChapter(input.value); 

        // add the chapter to the array
        chaptersArray.push(input.value); 
        
        // update the localStorage with the new array
        setChapterList(); 

        // clear the input
        input.value = ''; 
    }

    // set the focus back to the input
    input.focus();
});










