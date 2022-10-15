let botao = document.querySelector("button");

botao.addEventListener("click", (event) => {
  let nome = document.querySelector("#nome");
  let sobrenome = document.querySelector("#sobrenome");
  let cpfform = document.querySelector("#cpfform");
  let usuario = document.querySelector("#usuario");
  let senha = document.querySelector("#senha");
  let senharep = document.querySelector("#senharep");

  let container = document.getElementsByClassName('container')
  let containerquery = document.querySelectorAll('.error-text')
    for (let erros of containerquery) {
    erros.remove()
  }

  let form1 = new Form(nome, sobrenome, cpfform, usuario, senha, senharep);
  console.log(form1);
});

class Form {
  constructor(nome, sobrenome, cpfform, usuario, senha, senharep) {
    this.checkName(nome.value);
    this.checkSobrenome(sobrenome.value);
    this.checkUser(usuario.value);
    this.checkSenha(senha.value, senharep.value);
    this.checkCpf(cpfform.value);
  }

  checkName(nomevalue) {
    if (nome.value == "") {
      return this.callError(nome, "espaço em branco");
    }
    let regexp = /["!@#$%¨&*(){}/?°,<.>;:^~´`\u005b\u005d]+/;
    !regexp.test(nomevalue) == true
      ? (this.nome = nomevalue)
      : this.callError(nome, "nome invalido");
  }

  checkSobrenome(sobrenomevalue) {
    if (sobrenome.value == "") {
      return this.callError(sobrenome, "espaço em branco");
    }
    let regexp = /["!@#$%¨&*(){}/?°,<.>;:^~´`\u005b\u005d]+/;
    !regexp.test(sobrenomevalue) == true
      ? (this.sobrenome = sobrenomevalue)
      : this.callError(sobrenome, "sobrenome invalido");
  }

  checkUser(usuariovalue) {
    if (usuario.value == "") {
      return this.callError(usuario, "espaço em branco");
    }
    let userlenght =
      String(usuario.value).length > 3 && String(usuario.value).length < 13
        ? true
        : false;
    if (userlenght == true) {
      this.usuario = usuariovalue;
    } else {
      this.callError(usuario, "usuario limitado de 3 a 12 caracteres");
    }
  }
  checkSenha(senhavalue, senharepvalue) {
    if (senha.value == "") {
      return this.callError(senha, "senha em branco");
    }
    let senhaLenght = String(senhavalue).length;
    let regexp = /["!@#$%¨&*(){}/?°,<.>;:^~´`\u005b\u005d]+/;

    if (senhaLenght > 6 && senhaLenght < 12) {
      if (!regexp.test(senhavalue)) {
        if (senhavalue == senharepvalue) {
          if (senharep.value == "") {
            this.callError(senharep, "confirmação de senha em branco");
          }
          this.senha = senhavalue;
        } else {
          this.callError(senha, "as senhas não coincidem");
        }
      } else {
        this.callError(senha, "apenas letras e numeros são admitidos");
      }
    } else {
      this.callError(senha, "senha deve possuir entre 6 e 12 caracteres");
    }
  }

  checkCpf(cpfvalue) {
    if (cpfform.value == "") {
      return this.callError(cpfform, "espaço em branco");
    }
    let cpfUser = new Cpf(cpfvalue);
    cpfUser.val == true
      ? (this.cpf = cpfvalue)
      : this.callError(cpfform, "cpf invalido");
  }

  callError(element, message) {
    let parent = element.parentNode;
    let error = document.createElement("div");

    error.classList.add("error-text");
    error.style.color = "red";
    error.style.fontSize = "14.5px";
    error.innerHTML = message;

    parent.appendChild(error);
  //   console.log(parent.childNodes);
 }
}

class Cpf {
  constructor(cpf) {
    this.validaInput(cpf);
  }

  validaInput(input) {
    if (typeof input == typeof "string") {
      this.validar(input);
    } else if (typeof input == "number") {
      let inputString = input.toString();
      this.validar(inputString);
    }
  }

  validar(cpf) {
    this.cpf = cpf;
    let cpf_lastDigits;
    let cpf_comparativo;
    let cpf_7digits;

    if (typeof cpf == typeof "string") {
      this.cpf = cpf;
      cpf_lastDigits = [this.cpf[cpf.length - 2], this.cpf[cpf.length - 1]];
      cpf_comparativo = Array.from(cpf.replace(/\D+/g, ""));
      cpf_7digits = cpf_comparativo.slice(0, 9);
    }
    const digito1 = this.getDigito(cpf_7digits);
    const digito2 = this.getDigito(cpf_7digits.concat(digito1));

    let val = this.checkout(
      digito1,
      cpf_lastDigits[0],
      digito2,
      cpf_lastDigits[1]
    );
    this.val = val;
  }
  getDigito(inputDigito) {
    let cpfArray = [];
    let i = Number(inputDigito.length) + 1;

    for (let valor of inputDigito) {
      let produto = valor * i;
      cpfArray.push(produto);
      i = i - 1;
    }

    let value = cpfArray.reduce((acumulador, valor) => (acumulador += valor));
    value = 11 - (value % 11);
    value > 9 ? (value = 0) : (value = value);
    return value;
  }
  checkout(digito1, comparativo1, digito2, comparativo2) {
    if (digito1 == comparativo1 && digito2 == comparativo2) {
      return true;
    }
    return false;
  }
}
