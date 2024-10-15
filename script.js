const board = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameState[index] !== '' || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`${gameState[a]} wins!`);
            isGameActive = false;
            return;
        }
    }

    if (!gameState.includes('')) {
        alert("It's a draw!");
        isGameActive = false;
    }
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        createCell(i);
    }
}

restartBtn.addEventListener('click', restartGame);

for (let i = 0; i < 9; i++) {
    createCell(i);
}
