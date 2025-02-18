//Funções no javascrip
//Função nomeada
function subtracao(num1, num2) {
    return num1 - num2
}
console.log(subtracao(3, 2))

//função não nomeada
let divisao = function (num1, num2) {
    if (num2 == 0) {
        return 'Impossível dividir por zero'
    } else {
        return num1 / num2
    }
}
console.log(divisao(9, 3))

//Arrow function
let multiplicacao = (num1, num2) => {
    return num1 * num2
}
console.log(multiplicacao(2, 3))

let somar = (num1, num2) => num1 + num2
console.log(somar(3, 5))

let operacao = (num1, num2, conta) => conta(num1, num2)

console.log(operacao(5, 6, somar))