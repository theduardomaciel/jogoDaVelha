const casas = document.querySelectorAll(".casa");
const tabuleiro = document.getElementById("tabuleiro");

const namesInputContainer = document.getElementById("names-input");
const gameInfoContainer = document.getElementById("game-info");
const winnerContainer = document.getElementById("winner");

const restartButton = document.getElementById("restart-button");
const registerButton = document.getElementById("register-button");

let players = {
	X: "X",
	O: "O",
};

let currentPlayer = "X";

const win_combinations = [
	// Combinações que leva um jogador a ganhar, caso nenhuma delas esteja no resultado, será contabilizado empate
	/* 
			A	B	C      
		1.	[0,	1,	2]
		2.	[3,	4,	5]
		3.	[6,	7,	8]
	*/

	[0, 1, 2], // Linha 1
	[0, 3, 6], // Coluna A
	[0, 4, 8], // Diagonal principal

	[1, 4, 7], // Coluna B

	[2, 5, 8], // Coluna C
	[2, 4, 6], // Diagonal secundaria

	[3, 4, 5], // Linha 2

	[6, 7, 8], // Linha 3
];

function cadastro() {
	for (const casa of casas) {
		casa.classList.remove("O");
		casa.classList.remove("X");
	}

	namesInputContainer.style.display = "flex";

	players["X"] = document.getElementById("player1-name").value ?? "Jogador 1";
	players["O"] = document.getElementById("player2-name").value ?? "Jogador 2";
	winnerContainer.style.display = "none";

	mostrarJogadores();

	registerButton.addEventListener("click", beginGame);
}

// Função dedicada a melhorar a jogabilidade mostrando quem são os jogadores
function mostrarJogadores() {
	const currentPlayerName = document.getElementById("current-player-text");
	currentPlayerName.textContent =
		players[currentPlayer] + ` (${currentPlayer})`;
}

const beginGame = () => {
	gameInfoContainer.style.display = "flex";
	namesInputContainer.style.display = "none";

	currentPlayer = "X";

	for (const casa of casas) {
		casa.removeEventListener("click", lidarClick);
		casa.addEventListener("click", lidarClick, { once: true });
		//once - responsável por não adicionar uma classe quando já tiver
	}

	definirHoverDoTabuleiro();
};

// Mensagem no final do jogo
function endGame(empate) {
	const winnerText = document.getElementById("winner-text");

	if (empate) {
		winnerText.textContent = "Empate!";
	} else {
		winnerText.textContent = `O jogador ${players[currentPlayer]} (${currentPlayer}) venceu!`;
	}

	gameInfoContainer.style.display = "none";
	winnerContainer.style.display = "flex";
}

function searchForVictory(jogadorAtual) {
	return win_combinations.some((combination) => {
		return combination.every((index) => {
			return casas[index].classList.contains(jogadorAtual);
		});
	});
}

/*
	Arrow functions (funções de seta)
  	Outra forma de estruturar uma função é a declarando como uma variável:
    	nome = () => ação 
  	Geralmente são funções anonimas || Não precisam do igual
*/

function procurarPorEmpate() {
	return [...casas].every((casa) => {
		return casa.classList.contains("X") || casa.classList.contains("O");
	});
}

function alteradorClasse(casa, adicionarClasse) {
	casa.classList.add(adicionarClasse);
}

function definirHoverDoTabuleiro() {
	const currentPlayerText = document.getElementById("current-player-text");

	gameInfoContainer.classList.add("animate-out");

	const timeout = setTimeout(() => {
		gameInfoContainer.classList.remove("animate-out");
		gameInfoContainer.classList.add("animate-in");
		currentPlayerText.textContent = `${players[currentPlayer]} (${currentPlayer})`;
		clearTimeout(timeout);

		const timeout2 = setTimeout(() => {
			gameInfoContainer.classList.remove("animate-in");
			clearTimeout(timeout2);
		}, 250);
	}, 250);

	if (currentPlayer === "X") {
		tabuleiro.classList.remove("O");
		tabuleiro.classList.add("X");
	} else {
		tabuleiro.classList.remove("X");
		tabuleiro.classList.add("O");
	}
}

const mudarJogador = () => {
	currentPlayer = currentPlayer === "X" ? "O" : "X";
	definirHoverDoTabuleiro();
};

function lidarClick(e) {
	// Colocar a marca (X ou Círculo)
	const casa = e.target;

	alteradorClasse(casa, currentPlayer); //Chama a função

	// Verificar por vitória
	const vencedor = searchForVictory(currentPlayer);

	// Verificar por empate
	const empate = procurarPorEmpate();

	if (vencedor) {
		endGame(false);
	} else if (empate) {
		endGame(true);
	} else {
		// Mudar jogador
		mudarJogador();
	}
}

cadastro();

restartButton.addEventListener("click", cadastro);
