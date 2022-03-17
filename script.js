var valor_secreto = null, total_tentativas = null, informou_valor_invalido = null

function gerar_numero_aleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function reset() {
    document.getElementById("message").innerHTML = "Você é capaz de adivinhar qual número eu estou pensando?"
    document.getElementById("cheat").innerHTML = "Vou facilitar para você, é um número inteiro de 0 a 10."
    document.getElementById("value").innerHTML = ""
    document.getElementById("value").hidden = false
    document.getElementById("guess-button").hidden = false
    document.getElementById("restart").hidden = true

    valor_secreto = gerar_numero_aleatorio(0, 10)
    total_tentativas = 3
    informou_valor_invalido = false
}


function habilitar_novo_jogo() {
    document.getElementById("value").hidden = true
    document.getElementById("guess-button").hidden = true
    document.getElementById("restart").hidden = false
}


reset()

document.getElementById("restart").addEventListener("click", evento => {
    reset()
})


document.getElementById("guess-button").addEventListener("click", evento => {
    let campo_mensagem = document.getElementById("message")
    let campo_dica = document.getElementById("cheat")

    let campo_valor = document.getElementById("value")
    let valor = campo_valor.value

    valor = parseFloat(valor)

    if (informou_valor_invalido && !(valor >= 0 && valor <= 10)) {
        campo_mensagem.innerHTML = "Errar é humano, persistir no erro é BURRICE!"
        campo_dica.innerHTML = "Tente de novo, seu incapaz!"
        return
    }

    if (Number.isNaN(valor)) {
        if (total_tentativas == 3) {
            campo_mensagem.innerHTML = "Está com dificuldade para escolher um número?!<br>" + "Vamos lá seu tolo(a), tente novamente!"
            campo_dica.innerHTML = "Escolha um número inteiro de 0 a 10."
        }
        else {
            campo_mensagem.innerHTML = "Qual é o problema?<br>Seu intelecto falhou assim de repente?!"
            campo_dica.innerHTML = "Devo lembrá-lo(a) que é um número inteiro de 0 a 10?"
        }

        informou_valor_invalido = true
    }
    else if (!Number.isInteger(valor)) {

        if (total_tentativas == 3) {

            if (valor < 0 || valor > 10) {
                campo_mensagem.innerHTML = "Pelo visto ainda não aprendeu a contar até 10 e também não sabe o que é um número inteiro."
                campo_dica.innerHTML = "Ainda tem coragem para me enfrentar?"
            }
            else {
                campo_mensagem.innerHTML = "Achei que fosse mais esperto(a)."
                campo_dica.innerHTML = "Você não entendeu quando eu disse que era um número INTEIRO?!"
            }

        }
        else {
            campo_mensagem.innerHTML = "Qual é o problema?<br>Seu intelecto falhou assim de repente?!"
            campo_dica.innerHTML = "Devo lembrá-lo(a) que é um número INTEIRO de 0 a 10?"
        }

        informou_valor_invalido = true
    }
    else if (Number.isInteger(valor)) {

        if (valor >= 0 && valor <= 10) {
            informou_valor_invalido = false

            if (valor == valor_secreto) {
                campo_mensagem.innerHTML = "Parabéns, você teve sorte dessa vez, mas certamente não conseguirá na próxima!"
                campo_dica.innerHTML = "Quer jogar de novo?"

                habilitar_novo_jogo()
            }
            else {

                total_tentativas--;

                if (total_tentativas > 0) {
                    campo_mensagem.innerHTML = "Acho que adivinhação não é o seu ponto forte!"
                    campo_dica.innerHTML = "Vamos lá, você têm mais " + total_tentativas + " tentativa(s)."

                }
                else {
                    campo_mensagem.innerHTML = "Você fracassou exatamente como eu havia previsto!<br>Para sua infelicidade, eu mentalizei o número " + valor_secreto + "."
                    campo_dica.innerHTML = "Quer tentar me desafiar novamente?"

                    habilitar_novo_jogo()
                }
            }
        }
        else if (total_tentativas == 3) {
            campo_mensagem.innerHTML = "Não sabe contar até 10 e ainda acha que pode me desafiar?"
            campo_dica.innerHTML = "Tente contar com os dedos, perdedor(a)!"
            informou_valor_invalido = true
        }
        else {
            campo_mensagem.innerHTML = "Qual é o problema?<br>Seu intelecto falhou assim de repente?!"
            campo_dica.innerHTML = "Devo lembrá-lo(a) que é um número inteiro de 0 a 10?"
            informou_valor_invalido = true
        }

    }

    campo_valor.value = ""
})