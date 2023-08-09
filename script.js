let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

function makeMove(cellIndex) {
  if (board[cellIndex] === "") {
    board[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      alert(currentPlayer + " wins!");
      resetBoard();
    } else if (board.filter(cell => cell === "").length === 0) {
      alert("It's a draw!");
      resetBoard();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin(player) {
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

  return winCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

function resetBoard() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach(cell => (cell.innerText = ""));
}   