const cellElements = document.querySelectorAll("[data-cell]"); /*Seleciona todos as divs que tem essa classe, logo todos os cell */
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  /*   A  B  C      */
  /*1.[0, 1, 2]
    2.[3, 4, 5]
    3.[6, 7, 8]*/

  [0, 1, 2],/*linha 1*/
  [3, 4, 5],/*linha 2*/
  [6, 7, 8],/*linha 3*/
  [0, 3, 6],/*Coluna A*/
  [1, 4, 7],/*Coluna B*/
  [2, 5, 8],/*Coluna C*/
  [0, 4, 8],/*Diagonal principal*/
  [2, 4, 6],/*Diagonal secundaria*/
];

const startGame = () => {
  isCircleTurn = false;
/*Para (Instaceia uma variavel) da estrutura que eu quero percorrer [OBS.: for of retorna o valor da possição || for in retorna apenas as posições]*/
  for (const cell of cellElements) {
    /**/
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
