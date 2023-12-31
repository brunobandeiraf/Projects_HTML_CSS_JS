import { Modal } from './modal.js'
import { AlertError } from "./alert-error.js"
import { calculateIMC, notANumber } from "./utils.js"

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

// 3 maneiras de criar e atribuir função a um evento
// form.onsubmit = function(){}

// form.onsubmit = () => {}

// form.onsubmit = handleSubmit 
// function handleSubmit(){}

// Fechar a janela de erro ao digitar no campo
// evento é de nome input
inputWeight.oninput = () =>  AlertError.close()
inputHeight.oninput = () => AlertError.close()

form.onsubmit = event => {
    // Evite o padrão - não envia o formulário e não recarrega a página
    event.preventDefault() 

    const weight = inputWeight.value
    const height = inputHeight.value

    // Verifica se os valores são números
    const weightOrHeightIsNotANumber = notANumber(weight) || notANumber(height)

    if (weightOrHeightIsNotANumber) {
        AlertError.open()
        return;
    }

    // Remover modal de error
    AlertError.close()

    const result = calculateIMC(weight, height)
    // Mostrar o resultado
    displayResultMessage(result)
}

function displayResultMessage(result) {
    const message = `Seu IMC é de ${result}`

    Modal.message.innerText = message
    Modal.open() 
}


