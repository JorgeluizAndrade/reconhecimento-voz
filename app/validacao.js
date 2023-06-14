 function verificaSeEvalido(chute){
    const numero = +chute

    if(chuteInvalido(numero)){
        elementoChute.innerHTML+='<div>valor invalido</div>'
    }

    if(numeroMaiorOuMenorQueOPermitido(numero)){
        elementoChute.innerHTML+=`<div>valor invalido: o número secreto precisa está entre ${menorValor} e ${maiorValor} </div>`
    }
    if(numero === numeroSecreto){
        document.body.innerHTML = `
        <h2>Você acertou</h2>
        <h3>O número secreto era ${numeroSecreto}</h3>
        <button class="botao-novamente" id="jogar-novamente">Jogar Novamente</button>
        `
    } else if (numero > numeroSecreto) {
        elementoChute.innerHTML += `
        <div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>
        `
    } else {
        elementoChute.innerHTML += `
        <div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>
        `
    }
 }  

function chuteInvalido(numero) {
    return Number.isNaN(numero)
}

function numeroMaiorOuMenorQueOPermitido(numero){
    return numero > maiorValor || numero < menorValor
}


document.body.addEventListener('click', e => {
    if(e.target.id == "jogar-novamente"){
        window.location.reload()
    }
})
