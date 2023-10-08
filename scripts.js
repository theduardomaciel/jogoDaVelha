const posicoesElemento = document.querySelectorAll("[data-posicoes]"); 
//Seleciona todos as divs que tem essa classe, logo todos os posicoes
const tabuleiro = document.querySelector("[data-tabuleiro]");
/*Seleciona todos as divs que tem essa classe, logo todos os tabuleiros

Ligação com a mensagem devitporia ou empete*/
const elementoTextoMensagemVencedor = document.querySelector("[data-texto-mensagem-vitoria]");
//Seleciona todos as divs que tem essa classe, logo todos os texto-mensagem-vitoria
const mensagemVitoria = document.querySelector("[data-pagina-vitoria]");
//Seleciona todos as divs que tem essa classe, logo todos os mensagem-vitoria
const restartButton = document.querySelector("[data-restart-button]");
/*Seleciona todos as divs que tem essa classe, logo todos os restart-button

Ligação com os inputs de nome*/
const inputNameTextElement = document.querySelector("[data-inputName]");
//Seleciona todos as divs que tem essa classe, logo todos os inputName-message-text
const cadastroButton = document.querySelector("[data-cadastro-button]");
//Seleciona todos as divs que tem essa classe, logo todos os cadastro-button

const playerX = document.querySelector("[data-nome-jogadorUm]");
//Seleciona todos as divs que tem essa classe, logo todos os playerX
const playerCirculo = document.querySelector("[data-nome-jogadorDois]");
//Seleciona todos as divs que tem essa classe, logo todos os playerCirculo
const divInfGame = document.querySelector("[data-inf-game]");
//Seleciona todos as divs que tem essa classe, logo todos os inf-game
const infJogadorUm = document.querySelector("[data-inf-jogadorUm]");
//Seleciona todos as divs que tem essa classe, logo todos os inf-jogadorUm
const infJogadorDois = document.querySelector("[data-inf-jogadorDois]");
//Seleciona todos as divs que tem essa classe, logo todos os inf-jogadorDois

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
    cadastroButton.addEventListener("click", comecoJogo);
    playerUm=document.getElementById('playerX').value!==''?document.getElementById('playerX').value:'Jogador X';
    playerDois=document.getElementById('playerCirculo').value!=''?document.getElementById('playerCirculo').value:'Jogador O';
    mensagemVitoria.classList.remove("aparecer");
    //console.log(playerUm , playerDois);
    mostrarJogadores();
}
//Função dedicada a melhorar a jogabiliadade mostrando quem são os jogadores
function mostrarJogadores(){
  playerX.textContent=playerUm;
  playerCirculo.textContent=playerDois;
  }
/*
function ativarJogador(){
  playerX.classList.toggle('jogador-ativo');
  playerCirculo.classList.toggle('jogador-ativo');
}
*/
const comecoJogo = () => {
  divInfGame.classList.add("aparecer");
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
function encerraPartida (empate){
  divInfGame.classList.remove("aparecer");
  if (empate) {
    elementoTextoMensagemVencedor.innerText = "Empate!";
  } else {
    elementoTextoMensagemVencedor.innerText = vezDoCirculo
      ? playerDois+" Venceu!"
      : playerUm+" Venceu!";
  }

  mensagemVitoria.classList.add("aparecer");
};

function procurarPorVitoria (jogadorAtual) {
  return combinacoesVitoria.some((combination) => {
    return combination.every((index) => {
      return posicoesElemento[index].classList.contains(jogadorAtual);
    });
  });
};
/*Arrow functions - funções de seta
  Outra forma de estruturar uma função é declaranco como variavél:
        nome = () => ação 
  Geralmente são funções anonimas || Não precisam do igual
*/
function procurarPorEmpate () {
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
  infJogadorDois.classList.remove("jogadorVez");
  tabuleiro.classList.remove("circulo");
  infJogadorUm.classList.remove("jogadorVez");
  tabuleiro.classList.remove("x");
  //Faz uma verificação é adiciona uma classe
  if (vezDoCirculo) {
    infJogadorDois.classList.add("jogadorVez");
    tabuleiro.classList.add("circulo");
  } else {
    infJogadorUm.classList.add("jogadorVez");
    tabuleiro.classList.add("x");
  }
};

const mudarJogador = () => {
  vezDoCirculo = !vezDoCirculo;
  definirHoverDoTabuleiro();
};

function lidarClick(e) {
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
