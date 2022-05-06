export class Conta {

    constructor({titular, banco, agencia, numero}) {
        Object.assign(this, {titular:titular, banco:banco, agencia:agencia, numero:numero} )
    }
    
//Construtor simples sem Object.assing
    // constructor({titular, banco, agencia, numero}) {
    //     this.titular = titular
    //     this.banco = banco
    //     this.agencia = agencia
    //     this.numero = numero
    // }   

}


//Em typescript
// export class Conta {

//     constructor(public titular:string , public banco:string, public agencia:string, public numero:string) {
        
// }