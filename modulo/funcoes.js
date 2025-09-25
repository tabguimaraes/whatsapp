const dataJSON = require("../modulo/contatos.js");

const MESSAGE_ERROR = {
  status: false,
  status_code: 500,
  development: "Tiago Guimarães",
};

const message = { status: true, status_code: 200, development: "Tiago Guimarães", data: [] };

let usuario;

// Função para selecionar o usuário pelo número do telefone e salvar os dados dentro da variável 'usuário'
function selecionarUsuarioPeloTelefone(userNumber) {
  usuario = dataJSON.contatos["whats-users"].find((item) => item.number === userNumber);
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

function listarDadosDaConta(userNumber) {
  try {
    selecionarUsuarioPeloTelefone(userNumber);
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

function listarDadosDeContato(userNumber) {
  try {
    selecionarUsuarioPeloTelefone(userNumber);

    usuario.contacts.forEach((item) => {
      message.data.push({ name: item.name, description: item.description, image: item.image });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarTodasMensagens(userNumber) {
  try {
    selecionarUsuarioPeloTelefone(userNumber);
    usuario.contacts.forEach((item) => {
      message.data.push({ contato: item.name, mensagens: item.messages });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarConversasDeUsuarioComUmContato(userNumber, query) {
  selecionarUsuarioPeloTelefone(userNumber);

  let resultado;

  // let mensagemEncontrada = usuario.find((mensagem) => mensagem.content || mensagem.sender === query);
  let mensagemEncontrada = usuario.contacts;

  console.log(mensagemEncontrada);
  //retorno do usuario ok
  // console.log(usuario);
  // console.log(mensagemEncontrada);

  let historico = {
    nome: usuario.account,
    numero: usuario.number,
    contato: {
      // nome: "usuario.contacts[query].name,"
      // messages: usuario.contacts[query].messages,
    },
  };
}

listarConversasDeUsuarioComUmContato("11966578996", "papa");

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
  listarDadosDeContato,
  listarTodasMensagens,
};
