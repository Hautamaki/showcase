let words;
let level;

const wordGrid = document.getElementById("word-grid");
const checkWordBtn = document.getElementById("check-word-btn");
const currentWordDisplay = document.getElementById("current-word");
const wordListContainer = document.getElementById("word-list");
const message = document.getElementById("message");

let selectedCells = [];
let currentWord = '';

// Define custom level or theme by specifying individual letters
let customLevel;

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
    }, 2900);
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

        if(words == '') {
            showModal();
        }
        
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
            span.textContent = "_";
            wordBox.appendChild(span);
        });
        wordListContainer.appendChild(wordBox);
    });
}

// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to initialize the game based on the level specified in URL parameter
function initializeGame() {
    level = getUrlParameter('lvl');

    document.getElementById("lvl").innerHTML = level;
    document.getElementById("title").innerHTML = "Sanapeli - Taso " + level;

    if(level < 11) {
        document.getElementById("vaikeusaste").innerHTML = 'Vaikeusaste <i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>';
    } else if (level < 21) {
        document.getElementById("vaikeusaste").innerHTML = 'Vaikeusaste <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>';
    } else if (level < 31) {
        document.getElementById("vaikeusaste").innerHTML = 'Vaikeusaste <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
    } else {
        document.getElementById("vaikeusaste").innerHTML = '';
    }

    switch (level) {
        case '1':
            initializeLevel1();
            break;
        case '2':
            initializeLevel2();
            break;
        case '3':
            initializeLevel3();
            break;
        case '4':
            initializeLevel4();
            break;
        case '5':
            initializeLevel5();
            break;
        case '6':
            initializeLevel6();
            break;
        case '7':
            initializeLevel7();
            break;
        case '8':
            initializeLevel8();
            break;
        case '9':
            initializeLevel9();
            break;
        case '10':
            initializeLevel10();
            break;

        // SEASONAL LEVELS
        case 'joulu':
            initializeLevelJoulu();
            break;
        case 'halloween':
            initializeLevelHalloween();
            break;
        default:
            // Handle default case or invalid level
            window.location.href = "index.html?lvl=error";
            break;
    }
}

// Function to handle hint button click
function giveHint() {
    const unsolvedWords = Array.from(wordListContainer.querySelectorAll('.word-box:not(.guessed)'));
    if (unsolvedWords.length === 0) {
        showMessage("Kaikki sanat on jo ratkottu.");
        return;
    }

    let randomWordIndex = Math.floor(Math.random() * unsolvedWords.length);
    const randomWord = unsolvedWords[randomWordIndex];

    const underscores = Array.from(randomWord.querySelectorAll('span')).filter(span => span.textContent === "_");
    const satunnainenKirjain = Math.floor(Math.random() * words[randomWordIndex].length);

    if (underscores.length > 0) {
        const randomUnderscore = underscores[Math.floor(Math.random() * underscores.length)];

        const letterIndex = Array.from(randomWord.children).indexOf(randomUnderscore); //indexOf(randomUnderscore)
        
        randomWord.children[satunnainenKirjain].innerHTML = words[randomWordIndex][satunnainenKirjain]; // Replace underscore with revealed letter
        
        randomWord.children[satunnainenKirjain].classList.add("revealed"); // Add class for styling
        showMessage("Kirjain paljastettu.");
    } else {
        showMessage("Ei voida paljastaa enempää.");
    }
}

// Event listener for hint button click
const hintBtn = document.getElementById("hint-btn");
hintBtn.addEventListener("click", giveHint);

// Function to display the modal
function showModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Event listener for close button
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", closeModal);

// Event listener for next level button
const nextLevelButton = document.getElementById("next-level-btn");
nextLevelButton.addEventListener("click", function() {
    // Redirect to the next level or handle level progression
    let levelToNumber = Number(level);
    let nextLevel = levelToNumber + 1;
    window.location.href = "game.html?lvl=" + nextLevel;
});

// Event listener for homepage button
const homepageButton = document.getElementById("homepage-btn");
homepageButton.addEventListener("click", function() {
    // Redirect to the homepage or handle navigation to homepage
    window.location.href = "index.html";
});


// Assuming level completion status is represented by an array
let levelCompletionStatus = [];

// Load level completion status from localStorage if available
if (localStorage.getItem('levelCompletionStatus')) {
    levelCompletionStatus = JSON.parse(localStorage.getItem('levelCompletionStatus'));
} else {
    // Initialize level completion status if not available
    for (let i = 0; i < 10; i++) {
        levelCompletionStatus.push(false); // Assuming all levels are initially incomplete
    }
}

// Function to mark a level as completed
function markLevelCompleted(level) {
    levelCompletionStatus[level] = true;
    localStorage.setItem('levelCompletionStatus', JSON.stringify(levelCompletionStatus));
}

// Function to check if a level is completed
function isLevelCompleted(level) {
    return levelCompletionStatus[level];
}



function generateLevel(customLevel, words) {
    // Initialize the game
    generateGrid(customLevel);
    initializeWordList(words);
}


// Event listener for checking word
checkWordBtn.addEventListener("click", checkWord);



// Call initializeGame function when the page loads
window.addEventListener('load', initializeGame);


