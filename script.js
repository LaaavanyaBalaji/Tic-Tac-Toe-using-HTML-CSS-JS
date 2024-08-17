document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

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

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Player ${currentPlayer} beats Player ${currentPlayer === 'X' ? 'O' : 'X'}!`;
            gameActive = false;
            highlightWinningCells(winningCombination);
            return;
        }

        if (!board.includes('')) {
            status.textContent = 'Draw the Match!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function highlightWinningCells(winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('strike');
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('strike');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    status.textContent = `Player ${currentPlayer}'s Turn`;
});
