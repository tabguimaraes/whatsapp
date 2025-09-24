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
  message.usuarios = [];
  dados.contatos["whats-users"].forEach((item) => {
    message.usuarios.push(item);
  });
  return message;
}
