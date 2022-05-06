import { calculaIMC } from "./oms.js";
import { Conta } from "./model/conta.js";

const imc = calculaIMC({altura: 1.75, peso: 70} )

console.log(imc)

const configuration = {
    peso: 68,
    altura: 1.77
}

const {peso: massa, altura} = configuration

console.log(massa)
console.log(altura)

//em python
// def calcula_imc(peso, altura):
//     return peso / (altura * altura)

// imc = calcula_imc(peso=70, altura=1,75)

// print imc

const conta = new Conta({
    titular: 'Joana',
    banco: 'Rico',
    agencia: '123',
    numero: '3210'
})

console.log(conta)

const object1 = {nome: 'Joana'}
const object2 = {peso: 56}

Object.assign(object1, object2)
console.log(object1)



