var divElement = document.createElement('div');
var buttonElement = document.createElement('button');

divElement.id = 'tester-id';
buttonElement.id = 'div-id';
buttonElement.className = 'div-class';

divElement.appendChild(buttonElement); 
// gawa na yung unang container at yung button sa loob

var parElement = document.createElement('p'); parElement.innerText = 'Im a paragraph';

buttonElement.appendChild(parElement);
// gawa na dito yung main objective;


// Function to add a new paragraph element to the container
function addParagraph() {
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'New paragraph added!';
    const container = document.getElementById('container');
    container.appendChild(newParagraph);
}

// Function to modify the text of the first paragraph
function modifyText() {
    const container = document.getElementById('container');
    const firstParagraph = container.querySelector('p');
    if (firstParagraph) {
        firstParagraph.textContent = 'Text modified!';
    }
}

// Function to delete the first paragraph
function deleteParagraph() {
    const container = document.getElementById('container');
    const firstParagraph = container.querySelector('p');
    if (firstParagraph) {
        container.removeChild(firstParagraph);
    }
}


