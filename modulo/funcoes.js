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

    message.dados.push({
      nome: usuario.account,
      nickname: usuario.nickname,
      "profile-image": usuario["profile-image"],
      number: usuario.number,
      background: usuario.background,
      "created-since-start": usuario["created-since"].start,
      "created-since-end": usuario["created-since"].end,
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarDadosDeContato(number) {
  try {
    message.dados = [];
    let usuario = dados.contatos["whats-users"].find((item) => item.number === number);

    usuario.contacts.forEach((item) => {
      message.dados.push({ name: item.name, description: item.description, image: item.image });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
  listarDadosDeContato,
};
