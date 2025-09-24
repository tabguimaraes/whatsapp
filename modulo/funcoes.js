const dataJSON = require("../modulo/contatos.js");

const MESSAGE_ERROR = {
  status: false,
  status_code: 500,
  development: "Tiago Guimarães",
};

const message = { status: true, status_code: 200, development: "Tiago Guimarães", dados: [] };

let usuario;

function listarTodosUsuarios() {
  try {
    dataJSON.contatos["whats-users"].forEach((item) => {
      message.dados.push(item);
    });
    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarDadosDaConta(number) {
  try {
    selecionarUsuario(number);
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
    usuario = dataJSON.contatos["whats-users"].find((item) => item.number === number);

    usuario.contacts.forEach((item) => {
      message.dados.push({ name: item.name, description: item.description, image: item.image });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarTodasMensagens(number) {
  try {
    selecionarUsuario(number);
    usuario.contacts.forEach((item) => {
      message.dados.push({ contato: item.name }, { mensagens: item.messages });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function selecionarUsuario(number) {
  usuario = dataJSON.contatos["whats-users"].find((item) => item.number === number);
  return usuario;
}

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
  listarDadosDeContato,
  listarTodasMensagens,
};
