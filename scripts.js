const cellElements = document.querySelectorAll("[data-cell]"); 
//Seleciona todos as divs que tem essa classe, logo todos os cell
const board = document.querySelector("[data-board]");
/*Seleciona todos as divs que tem essa classe, logo todos os boards

Ligação com a mensagem devitporia ou empete*/
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
//Seleciona todos as divs que tem essa classe, logo todos os winning-message-text
const winningMessage = document.querySelector("[data-winning-message]");
//Seleciona todos as divs que tem essa classe, logo todos os winning-message
const restartButton = document.querySelector("[data-restart-button]");
/*Seleciona todos as divs que tem essa classe, logo todos os restart-button

Ligação com os inputs de nome*/
const inputNameTextElement = document.querySelector("[data-inputName-message-text]");
//Seleciona todos as divs que tem essa classe, logo todos os inputName-message-text
const inputNameMessage = document.querySelector("[data-inputName-message]");
//Seleciona todos as divs que tem essa classe, logo todos os inputName-message
const cadastroButton = document.querySelector("[data-cadastro-button]");
//Seleciona todos as divs que tem essa classe, logo todos os cadastro-button

let vezDoCirculo;//É a vez do circulo ?

const winningCombinations = [
  /*Combinações que leva um jogador a ganhar,
   caso nenhuma delas esteja no resultado sera contabilizado empate
       A  B  C      
    1.[0, 1, 2]
    2.[3, 4, 5]
    3.[6, 7, 8]*/

  [0, 1, 2],//linha 1
  [3, 4, 5],//linha 2
  [6, 7, 8],//linha 3
  [0, 3, 6],//Coluna A
  [1, 4, 7],//Coluna B
  [2, 5, 8],//Coluna C
  [0, 4, 8],//Diagonal principal
  [2, 4, 6],//Diagonal secundaria
];
function mensagemStarGame(nomeUm,nomeDois){
  inputNameMessage.classList.remove("show-inputName-message")
}
const startGame = () => {
 // mensagemStarGame(nomeUm,nomeDois);

  vezDoCirculo = false;
//Para (Instaceia uma variavel) da estrutura que eu quero percorrer [OBS.: for of retorna o valor da possição || for in retorna apenas as posições]
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
                                                 //once - responsavel por não adiconar uma classe quando já tiver
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};
//Mensagem no final do jogo
const encerraPartida = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = vezDoCirculo
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

function placeMark (cell, classToAdd) {
  cell.classList.add(classToAdd);
};
//Pesquisar qual a diferença de estrutura
function setBoardHoverClass ()  {
  //Remove a classe anterior antes de adicionar uma nova
  board.classList.remove("circle");
  board.classList.remove("x");
  //Faz uma verificação é adiciona uma classe
  if (vezDoCirculo) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const mudarJogador = () => {
  vezDoCirculo = !vezDoCirculo;
  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = vezDoCirculo ? "circle" : "x"; //If e Else; verifica se é a vez do circula é adiciona a calsse corespondente

  placeMark(cell, classToAdd); //Chama a função

  // Verificar por vitória
  const vencedor = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (vencedor) {
    encerraPartida(false);
  } else if (isDraw) {
    encerraPartida(true);
  } else {
    // Mudar jogador
    mudarJogador();
  }
};

startGame();

restartButton.addEventListener("click", startGame);