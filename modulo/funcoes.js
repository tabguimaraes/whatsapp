const dados = require("../modulo/contatos.js");

const MESSAGE_ERROR = {
  status: false,
  status_code: 500,
  development: "Tiago Guimarães",
};

const message = { status: true, status_code: 200, development: "Tiago Guimarães" };

/* dados.contatos["whats-users"].forEach((item) => {
  console.log(item);
}); */

function listarTodosUsuarios() {
  try {
    message.usuarios = [];
    dados.contatos["whats-users"].forEach((item) => {
      message.usuarios.push(item);
    });
    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarDadosDaConta(number) {
  try {
    message.dados = [];
    let usuario = dados.contatos["whats-users"].find((item) => item.number === number);

    message.dados.push(
      { nome: usuario.account },
      { nickname: usuario.nickname },
      { "profile-image": usuario["profile-image"] },
      { number: usuario.number },
      { background: usuario.background },
      { "created-since-start": usuario["created-since"].start },
      { "created-since-end": usuario["created-since"].end }
    );

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

console.log(listarDadosDaConta("1194457796"));

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
};
