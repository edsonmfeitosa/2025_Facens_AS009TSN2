let aluno = {
    nome : 'Maria José',
    email : 'mariajose@gmail.com',
    tel : '(15) 99155887',
    endereco : {
        rua : 'Rua das flores',
        numero: 1,
        bairro: 'Jd Itapuã'
    },
    notas : [10, 8, 4, 10]
}

let {nome, email} = aluno
console.log(nome, email)

let {nome: a, tel: b} = aluno
console.log(b)

let [x, y] = [1, 2]
console.log(y)