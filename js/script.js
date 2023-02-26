const mainText = document.getElementById("main-text");
const hintText = document.getElementById("hint");
const guessInput = document.getElementById("guess");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const TOTAL_ATTEMPTS = 3, MIN_NUM = 0, MAX_NUM = 10;

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function inRange(value, min, max) {
    return value >= min && value <= max;
}

function updateElementContent(element, content) {
    element.textContent = content;
};

function clearField(element) {
    element.value = "";
};

function pressVisibleButton() {
    let button = document.querySelector("button:not([hidden])");
    button.classList.toggle("pressed");
    button.click();
    setTimeout(() => {
        button.classList.toggle("pressed");
    }, 100);
};


class Game {
    constructor() {
        this.init();
    }

    init() {
        this.targetNumber = generateRandomNumber(MIN_NUM, MAX_NUM);
        this.remainingAttempts = TOTAL_ATTEMPTS;
        this.previousGuesses = [];
        clearField(guessInput);
        guessInput.hidden = false;
        guessInput.focus();
        guessBtn.hidden = false;
        restartBtn.hidden = true;
        updateElementContent(
            mainText,
            `Estou pensando em um número de ${MIN_NUM} a ${MAX_NUM}, 
            você é capaz de adivinhar qual é?`
        );
        updateElementContent(hintText, "");
    };

    decreaseAttempt() {
        this.remainingAttempts--;
    };

    registerGuess(guess) {
        this.previousGuesses.push(guess);
    }

    hasMoreAttempts() { return this.remainingAttempts > 0; }

    validateGuess(guess) {
        let valid = false;

        if (Number.isNaN(guess)) {
            updateElementContent(
                mainText, "Está com dificuldade para escolher um número?!"
            );
            updateElementContent(
                hintText, "Vamos lá seu tolo(a), tente novamente!"
            );
        }
        else if (!Number.isInteger(guess)) {
            updateElementContent(
                mainText, "Não sabe o que é um número INTEIRO?!"
            );
            updateElementContent(
                hintText, "Achei que fosse mais esperto(a)."
            );
        }
        else if (!inRange(guess, MIN_NUM, MAX_NUM)) {
            updateElementContent(
                mainText,
                `Não sabe contar até ${MAX_NUM} e 
                ainda acha que pode me desafiar?`
            );
            updateElementContent(
                hintText, "Tente contar com os dedos, perdedor(a)!"
            );
        }
        else if (this.previousGuesses.includes(guess)) {
            updateElementContent(
                mainText, "Errar é humano, persistir no erro é BURRICE!"
            );
            updateElementContent(
                hintText, "Tente um número diferente, seu incapaz."
            );
        }
        else {
            valid = true;
        }

        return valid
    }

    checkHit(guess) {
        return guess === this.targetNumber;
    }

    nextAttempt() {
        updateElementContent(
            mainText, "Acho que adivinhação não é o seu ponto forte!"
        );
        updateElementContent(
            hintText,
            `Vamos lá, você têm mais ${this.remainingAttempts} tentativa(s).`
        );
    }

    finish() {

        let msg = this.remainingAttempts == 0
            ? `Você fracassou exatamente como eu havia previsto!.
            O número secreto é ${this.targetNumber}.`
            : "Parabéns, você teve sorte dessa vez, " +
            "mas certamente não conseguirá na próxima!";

        clearField(guessInput);
        guessInput.hidden = true;
        guessBtn.hidden = true;
        restartBtn.hidden = false;
        updateElementContent(mainText, msg);
        updateElementContent(hintText, "Quer tentar me desafiar novamente?");
    }

    restart() {
        this.init();
    }
}


const game = new Game();
window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        pressVisibleButton();
    }
});
guessBtn.addEventListener("click", () => {
    let userGuess = parseFloat(guessInput.value);
    clearField(guessInput);
    guessInput.focus();

    if (!game.validateGuess(userGuess)) {
        return;
    }
    game.registerGuess(userGuess);

    if (game.checkHit(userGuess)) {
        game.finish();
        return
    }

    game.decreaseAttempt();
    game.hasMoreAttempts() ? game.nextAttempt() : game.finish();
});
restartBtn.addEventListener("click", () => {
    game.restart();
});
