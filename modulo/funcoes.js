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
  // supondo que essa função retorna o objeto do usuário certo
  let usuario = selecionarUsuarioPeloTelefone(userNumber);

  let resultados = [];

  let historico = {
    nome: usuario.account,
    numero: usuario.number,
    conversas: [],
  };

  // percorre os contatos do usuário
  usuario.contacts.forEach((contato) => {
    // pega só as mensagens que contém o termo
    let msgsEncontradas = contato.messages.filter((msg) => msg.content.toLowerCase().includes(query.toLowerCase()));

    // se encontrou algo, adiciona ao histórico
    if (msgsEncontradas.length > 0) {
      historico.conversas.push({
        contato: contato.name,
        numero: contato.number,
        mensagens: msgsEncontradas,
      });
    }
  });

  resultados.push(historico);

  console.log(historico);
  console.log(resultados);

  return resultados;
}

listarConversasDeUsuarioComUmContato("11966578996", "papa");

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
  listarDadosDeContato,
  listarTodasMensagens,
};
