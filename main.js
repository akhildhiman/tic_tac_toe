const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// Gives an array with the help of Array.from(), grid() is an array of each quadrant
const grid = () => Array.from(document.getElementsByClassName("q"));

// Gives a number 
const numId = (element) => Number.parseInt(element.id.replace("q", ""));

// Returns an array of empty quadrants that does not have X or 0 in it, so that AI can play their move on those empty quadrants
const emptyQuadrants = () => grid().filter(element => element.innerText === "");

// Returns an array or winner if the quadrants have same text that is X or 0 but not empty strings
// We have a winner when every element matches the first element in the array
const allSame =(arr) => arr.every(element => element.innerText === arr[0].innerText && element.innerText !== "");

// If we pass 0, X, then it will put X letter on the Zeroth index 
const takeTurn = (index, letter) => grid()[index].innerText = letter;

const opponentChoice = () => numId(emptyQuadrants()[Math.floor(Math.random() * emptyQuadrants().length)]);

const endGame = (winningSequence) => {
    winningSequence.forEach(element => element.classList.add("winner"));
    disableListeners();
}
const checkForVictory = () => {
    let victory = false;
    winningCombos.forEach(combo => {
        const _grid = grid();
        const sequence = [_grid[combo[0]], _grid[combo[1]], _grid[combo[2]]];
        if (allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    })
     return victory;
}
const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), "o");
        if (!checkForVictory())
            enableListeners();
    }, 1000);
}    
const handleClick = (event) => {
    takeTurn(numId(event.target), "x");
    if (!checkForVictory())
        opponentTurn();
} 
// elabling click listener on every q element by looping thorugh each and every quadrant
const enableListeners = () => {
    grid().forEach(element => element.addEventListener("click", handleClick));
}
// disable click listener on every q element by looping thorugh each and every quadrant

const disableListeners = () => {
    grid().forEach(element => element.removeEventListener("click", handleClick));
}
enableListeners();
