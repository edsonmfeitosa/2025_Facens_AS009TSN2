//Notação Ponto
let pessoa = {}
pessoa.nome = 'edson'
console.log(pessoa)

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
console.log(aluno.endereco.bairro)
console.log(aluno.notas)