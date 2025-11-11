const words = ["MATO", "TALO", "AKVAARIO", "RASKAS", "MATTO", "LATO", "RAVI", "MENO"];

const wordGrid = document.getElementById("word-grid");
const checkWordBtn = document.getElementById("check-word-btn");
const currentWordDisplay = document.getElementById("current-word");
const wordListContainer = document.getElementById("word-list");
const message = document.getElementById("message");

let selectedCells = [];
let currentWord = '';

// Define custom level or theme by specifying individual letters
const customLevel = [
    ['A', 'R', 'A', 'S', 'E', 'S'],
    ['S', 'K', 'I', 'J', 'T', 'O'],
    ['M', 'N', 'O', 'I', 'R', 'T'],
    ['E', 'T', 'U', 'M', 'A', 'X'],
    ['H', 'L', 'A', 'V', 'A', 'D'],
    ['E', 'O', 'T', 'K', 'I', 'J']
];

// Generate letters grid from custom level
function generateGrid() {
    for (let i = 0; i < customLevel.length; i++) {
        for (let j = 0; j < customLevel[i].length; j++) {
            const letter = customLevel[i][j];
            const cell = document.createElement("div");
            cell.classList.add("letter-cell");
            cell.textContent = letter;
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            cell.addEventListener("click", toggleCell);
            wordGrid.appendChild(cell);
        }
    }
}

// Function to handle cell selection
function toggleCell() {
    const row = parseInt(this.getAttribute("data-row"));
    const col = parseInt(this.getAttribute("data-col"));
    const index = selectedCells.findIndex(cell => cell.row === row && cell.col === col);

    if (selectedCells.length === 0 || isAdjacent(row, col)) {
        if (index === -1) {
            this.classList.add("selected");
            selectedCells.push({ row, col });
            currentWord += this.textContent;
        } else {
            this.classList.remove("selected");
            selectedCells.splice(index, 1);
            currentWord = currentWord.replace(this.textContent, '');
        }

        currentWordDisplay.textContent = currentWord;
    }
}

// Function to check if cell is adjacent to the last selected cell
function isAdjacent(row, col) {
    if (selectedCells.length === 0) return true;

    const lastCell = selectedCells[selectedCells.length - 1];
    const rowDiff = Math.abs(row - lastCell.row);
    const colDiff = Math.abs(col - lastCell.col);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 1);
}

// Function to check entered word
function checkWord() {
    const foundWord = words.find(word => word === currentWord.toUpperCase());

    if (foundWord) {
        // showMessage(`${currentWord}`);
        showMessage('Oikein!');
        updateWordList(foundWord);
    } else {
        showMessage(`${currentWord} ei ole listassa.`);
    }

    clearSelection();
}

// Function to clear selected cells and current word
function clearSelection() {
    selectedCells.forEach(cell => {
        const cellElement = document.querySelector(`.letter-cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
        cellElement.classList.remove("selected");
    });
    selectedCells = [];
    currentWord = '';
    currentWordDisplay.textContent = '';
}

// Function to display a message over the grid for a few seconds
function showMessage(text) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.textContent = text;
    wordGrid.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Function to update word list with guessed word
function updateWordList(word) {
    const index = words.findIndex(w => w === word.toUpperCase());
    if (index !== -1) {
        const guessedWordBox = document.createElement("div");
        guessedWordBox.classList.add("word-box", "guessed");
        word.split('').forEach(letter => {
            const span = document.createElement("span");
            span.textContent = letter;
            guessedWordBox.appendChild(span);
        });
        wordListContainer.appendChild(guessedWordBox); // Append the guessed word box
        words.splice(index, 1); // Remove the guessed word from the words array
        
        // Remove the corresponding underscore from the word list container
        const wordBoxes = wordListContainer.querySelectorAll(".word-box:not(.guessed)");
        if (wordBoxes[index]) {
            wordBoxes[index].remove();
        }
    }
}

// Function to initialize word list with blanks
function initializeWordList() {
    words.forEach(word => {
        const wordBox = document.createElement("div");
        wordBox.classList.add("word-box");
        word.split('').forEach(letter => {
            const span = document.createElement("span");
            span.textContent = "_ ";
            wordBox.appendChild(span);
        });
        wordListContainer.appendChild(wordBox);
    });
}

// Event listener for checking word
checkWordBtn.addEventListener("click", checkWord);

// Initialize the game
generateGrid();
initializeWordList();
