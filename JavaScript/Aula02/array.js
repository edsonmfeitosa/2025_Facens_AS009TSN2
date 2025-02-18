//array
const coisas = [1, 2, 3.5, 4.99]
console.log(coisas)
console.log(coisas[1])
//atribuir um valor
coisas[3] = 'teste'
console.log(coisas)
coisas[1] = true
console.log(coisas)
coisas[10] = 'Edson'
console.log(coisas)
//funções no array
//colocar e apagar valor no início do array
coisas.unshift('novo valor')
console.log(coisas)
coisas.shift()
console.log(coisas)
console.log('Tamanho do Array: '+coisas.length)
console.log(`Tamanho do Array: ${coisas.length}`)

//colocar valor na última posição do array
coisas.push("último elemento")
console.log(coisas)
coisas.pop()
console.log(coisas)