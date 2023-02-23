const msgDisplay = document.getElementById("main-text");
const hintDisplay = document.getElementById("hint");
const numberInput = document.getElementById("guess");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const TOTAL_ATTEMPTS = 3,
    MIN_NUM = 0,
    MAX_NUM = 10;

const generateRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isValidGuess = (value) =>
    !Number.isNaN(value) &&
    Number.isInteger(value) &&
    10 >= value &&
    value >= 0;

const updateDisplay = (msg, hint = "") => {
    msgDisplay.innerHTML = msg;
    hintDisplay.innerHTML = hint;
};

const clearElementContent = (field) => {
    field.value = "";
};

const displayRestartGame = () => {
    clearElementContent(numberInput);
    numberInput.hidden = true;
    guessBtn.hidden = true;
    restartBtn.hidden = false;
};

const displayStartGame = () => {
    updateDisplay(
        `Estou pensando em um número de ${MIN_NUM} a ${MAX_NUM}, 
        você é capaz de adivinhar qual é?`
    );

    clearElementContent(numberInput);
    numberInput.hidden = false;
    numberInput.focus();
    guessBtn.hidden = false;
    restartBtn.hidden = true;
};

const pressVisibleButton = () => {
    let btn = document.querySelector("button:not([hidden])");
    btn.classList.toggle("pressed");
    btn.click();
    setTimeout(() => {
        btn.classList.toggle("pressed");
    }, 100);
};

class Game {
    constructor() {
        this.loadInitConfig();
    }

    loadInitConfig = () => {
        this.targetNumber = generateRandomNumber(MIN_NUM, MAX_NUM);
        this.totalAttempts = TOTAL_ATTEMPTS;
        this.guesses = [];
        displayStartGame();
    };

    decreaseAttempt = () => {
        this.totalAttempts--;
    };

    hasMoreAttempts = () => this.totalAttempts > 0;

    isHit = (guess) => guess == this.targetNumber;

    checkGuess = () => {
        let userGuess = parseFloat(numberInput.value);

        clearElementContent(numberInput);
        numberInput.focus();

        if (isValidGuess(userGuess)) {
            if (this.guesses.includes(userGuess)) {
                updateDisplay(
                    "Errar é humano, persistir no erro é BURRICE!",
                    "Tente um número diferente, seu incapaz."
                );
            } 
            else {
                this.guesses.push(userGuess);
                this.isHit(userGuess) ? this.complete() : this.tryAgain();
            }
        } 
        else if (Number.isInteger(userGuess)) {
            updateDisplay(
                "Não sabe contar até 10 e ainda acha que pode me desafiar?",
                "Tente contar com os dedos, perdedor(a)!"
            );
        } 
        else if (Number.isNaN(userGuess)) {
            updateDisplay(
                `Está com dificuldade para escolher um número?!`,
                `Vamos lá seu tolo(a), tente novamente!`
            );
        } 
        else {
            updateDisplay(
                "Não sabe o que é um número INTEIRO?!",
                "Achei que fosse mais esperto(a)."
            );
        }
    };

    complete = () => {
        updateDisplay(
            "Parabéns, você teve sorte dessa vez, mas certamente não conseguirá na próxima!",
            "Quer jogar de novo?"
        );
        displayRestartGame();
    };

    tryAgain = () => {
        this.decreaseAttempt();

        if (!this.hasMoreAttempts()) {
            updateDisplay(
                "Você fracassou exatamente como eu havia previsto!<br>" +
                    `O número secreto é ${this.targetNumber}.`,
                "Quer tentar me desafiar novamente?"
            );
            displayRestartGame();
        } 
        else {
            updateDisplay(
                "Acho que adivinhação não é o seu ponto forte!",
                `Vamos lá, você têm mais ${this.totalAttempts} tentativa(s).`
            );
        }
    };

    reset = () => {
        displayStartGame();
        this.loadInitConfig();
    };
}

const game = new Game();
window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        pressVisibleButton();
    }
});
guessBtn.addEventListener("click", game.checkGuess);
restartBtn.addEventListener("click", game.reset);
