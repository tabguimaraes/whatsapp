const dataJSON = require("../modulo/contatos.js");

const MESSAGE_ERROR = {
  status: false,
  status_code: 500,
  development: "Tiago Guimarães",
};

const message = { status: true, status_code: 200, development: "Tiago Guimarães", data: [] };

let usuario;

// Função para selecionar o usuário pelo número do telefone e salvar os dados dentro da variável 'usuário'
function selecionarUsuarioPeloTelefone(number) {
  usuario = dataJSON.contatos["whats-users"].find((item) => item.number === number);
  return usuario;
}

function listarTodosUsuarios() {
  try {
    dataJSON.contatos["whats-users"].forEach((item) => {
      message.data.push(item);
    });
    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarDadosDaConta(number) {
  try {
    selecionarUsuarioPeloTelefone(number);
    message.data.push({
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
    message.data = [];
    usuario = dataJSON.contatos["whats-users"].find((item) => item.number === number);

    usuario.contacts.forEach((item) => {
      message.data.push({ name: item.name, description: item.description, image: item.image });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarTodasMensagens(number) {
  try {
    selecionarUsuarioPeloTelefone(number);
    usuario.contacts.forEach((item) => {
      message.data.push({ contato: item.name }, { mensagens: item.messages });
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
  listarTodasMensagens,
};
