class Cpf {
    constructor(cpf) {  

        this.validaInput(cpf);
    }
    validaInput(input) {
        if (typeof input == typeof 'string') {
            this.validar(input)
        }
        else if (typeof input == 'number') {
            let inputString = input.toString()
            this.validar(inputString)
        }
    }

    validar(cpf) {
        this.cpf = cpf
        let cpf_lastDigits;
        let cpf_comparativo;
        let cpf_7digits;

        if (typeof cpf == typeof 'string') {
            this.cpf = cpf
            cpf_lastDigits = [this.cpf[cpf.length - 2], this.cpf[cpf.length - 1]]
            cpf_comparativo = Array.from(cpf.replace(/\D+/g, ""))
            cpf_7digits = cpf_comparativo.slice(0, 9)
        }
        const digito1 = this.getDigito(cpf_7digits)
        const digito2 = this.getDigito(cpf_7digits.concat(digito1))

        let val = this.checkout(digito1, cpf_lastDigits[0], digito2, cpf_lastDigits[1])
        this.val = val

    }
    getDigito(inputDigito) {
        let cpfArray = [];
        let i = Number(inputDigito.length) + 1;

        for (let valor of inputDigito) {
            let produto = valor * i;
            cpfArray.push(produto);
            i = i - 1;
        }

        let value = cpfArray.reduce((acumulador, valor) => acumulador += valor)
        value = 11 - (value % 11)
        value > 9 ? value = 0 : value = value
        return value
    }
    checkout(digito1, comparativo1, digito2, comparativo2) {

        if (digito1 == comparativo1 && digito2 == comparativo2) {
            return true
        }   return false
    }
}
const p1 = new Cpf("705.484.450-52")
console.log(p1)
const p2 = new Cpf(11111111111)

console.log(p2)