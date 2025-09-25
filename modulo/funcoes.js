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
  try {
    selecionarUsuarioPeloTelefone(userNumber);

    // Objeto para armazenar os dados de retorno da pesquisa
    let historico = {
      nome: usuario.account,
      numero: usuario.number,
      conversas: [],
    };
    let resultados = [];

    // Método para percorrer os contatos do usuário
    usuario.contacts.forEach((contato) => {
      // Pegar só as mensagens que contém o termo que veio da query e normaliza o texto deixando o text em minusculo
      let msgsEncontradas = contato.messages.filter((msg) => msg.content.toLowerCase().includes(query.toLowerCase()));

      if (msgsEncontradas.length > 0) {
        resultados.push({
          "nome-contato": contato.name,
          "numero-contato": contato.number,
          mensagens: msgsEncontradas,
        });
        historico.conversas.push(resultados);
      } else {
        return `A pesquisa por "${query}" não retrnou resultados.`;
      }
    });

    return historico;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

console.log(listarConversasDeUsuarioComUmContato("11966578996", "papa"));

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
  listarDadosDeContato,
  listarTodasMensagens,
  listarConversasDeUsuarioComUmContato,
};
