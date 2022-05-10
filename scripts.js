const posicoesElemento = document.querySelectorAll("[data-posicoes]"); 
//Seleciona todos as divs que tem essa classe, logo todos os posicoes
const tabuleiro = document.querySelector("[data-tabuleiro]");
/*Seleciona todos as divs que tem essa classe, logo todos os tabuleiros

Ligação com a mensagem devitporia ou empete*/
const elementoTextoMensagemVencedor = document.querySelector("[data-texto-mensagem-vitoria]");
//Seleciona todos as divs que tem essa classe, logo todos os texto-mensagem-vitoria
const mensagemVitoria = document.querySelector("[data-mensagem-vitoria]");
//Seleciona todos as divs que tem essa classe, logo todos os mensagem-vitoria
const restartButton = document.querySelector("[data-restart-button]");
/*Seleciona todos as divs que tem essa classe, logo todos os restart-button

Ligação com os inputs de nome*/
const inputNameTextElement = document.querySelector("[data-inputName]");
//Seleciona todos as divs que tem essa classe, logo todos os inputName-message-text
const inputNamePlayerUm = document.querySelector("[data-inputName-playerUm]");
//Seleciona todos as divs que tem essa classe, logo todos os inputName-playerUm
const inputNamePlayerDois= document.querySelector("[data-inputName-playerDois]");
//Seleciona todos as divs que tem essa classe, logo todos os inputName-playerUm
const cadastroButton = document.querySelector("[data-cadastro-button]");
//Seleciona todos as divs que tem essa classe, logo todos os cadastro-button
let playerUm;
let playerDois;
let vezDoCirculo;//É a vez do circulo ?

const combinacoesVitoria = [
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
function cadastro(){
    //Mostra tela para informar nome dos jogadores
    inputNameTextElement.classList.add("aparecer");
    //Quando cadastro for adicionar, mensagem vencedor vai ser remover
    cadastroButton.addEventListener("click", coemcoJogo);
    playerUm=document.getElementById('playerX').value;
    playerDois=document.getElementById('playerCirculo').value;
    mensagemVitoria.classList.remove("aparecer");
    console.log(playerUm , playerDois);
}
const coemcoJogo = () => {
  vezDoCirculo = false;
//Para (Instaceia uma variavel) da estrutura que eu quero percorrer [OBS.: for of retorna o valor da possição || for in retorna apenas as posições]
  for (const posicoes of posicoesElemento) {
    posicoes.classList.remove("circulo");
    posicoes.classList.remove("x");
    posicoes.removeEventListener("click", lidarClick);
    posicoes.addEventListener("click", lidarClick, { once: true });
                                                 //once - responsavel por não adiconar uma classe quando já tiver
  }

  definirHoverDoTabuleiro();
  //Quando mensagem vencedor for adicionar, cadastro vai ser remover
  inputNameTextElement.classList.remove("aparecer");
  mensagemVitoria.classList.remove("aparecer");
};
//Mensagem no final do jogo
const encerraPartida = (empate) => {
  if (empate) {
    elementoTextoMensagemVencedor.innerText = "Empate!";
  } else {
    elementoTextoMensagemVencedor.innerText = vezDoCirculo
      ? playerDois+" Venceu!"
      : playerUm+" Venceu!";
  }

  mensagemVitoria.classList.add("aparecer");
};

const procurarPorVitoria = (jogadorAtual) => {
  return combinacoesVitoria.some((combination) => {
    return combination.every((index) => {
      return posicoesElemento[index].classList.contains(jogadorAtual);
    });
  });
};

const procurarPorEmpate = () => {
  return [...posicoesElemento].every((posicoes) => {
    return posicoes.classList.contains("x") || posicoes.classList.contains("circulo");
  });
};

function alteradorClasse (posicoes, adicionarClasse) {
  posicoes.classList.add(adicionarClasse);
};
//Pesquisar qual a diferença de estrutura
function definirHoverDoTabuleiro ()  {
  //Remove a classe anterior antes de adicionar uma nova
  tabuleiro.classList.remove("circulo");
  tabuleiro.classList.remove("x");
  //Faz uma verificação é adiciona uma classe
  if (vezDoCirculo) {
    tabuleiro.classList.add("circulo");
  } else {
    tabuleiro.classList.add("x");
  }
};

const mudarJogador = () => {
  vezDoCirculo = !vezDoCirculo;
  definirHoverDoTabuleiro();
};

const lidarClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const posicoes = e.target;
  const adicionarClasse = vezDoCirculo ? "circulo" : "x"; //If e Else; verifica se é a vez do circula é adiciona a calsse corespondente

  alteradorClasse(posicoes, adicionarClasse); //Chama a função

  // Verificar por vitória
  const vencedor = procurarPorVitoria(adicionarClasse);

  // Verificar por empate
  const empate = procurarPorEmpate();

  if (vencedor) {
    encerraPartida(false);
  } else if (empate) {
    encerraPartida(true);
  } else {
    // Mudar jogador
    mudarJogador();
  }
};
cadastro();

restartButton.addEventListener("click", cadastro);