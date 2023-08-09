const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

function makeMove(cellIndex) {
  if (board[cellIndex] === "") {
    board[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].innerText = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].classList.add("selected");
    if (checkWin(currentPlayer)) {
      highlightWinningCombination(currentPlayer);
      setTimeout(function() {
        alert(currentPlayer + " wins!");
        resetBoard();
      }, 200);
    } else if (board.filter(cell => cell === "").length === 0) {
      alert("It's a draw!");
      resetBoard();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin(player) {
  return winCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

function highlightWinningCombination(player) {
  winCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      document.getElementsByClassName("cell")[a].classList.add("win");
      document.getElementsByClassName("cell")[b].classList.add("win");
      document.getElementsByClassName("cell")[c].classList.add("win");
    }
  });
}

function resetBoard() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("selected");
    cells[i].classList.remove("win");
  }
}