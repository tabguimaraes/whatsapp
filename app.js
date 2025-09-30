const express = require("express"); // Responsável pela API
const cors = require("cors"); // Responsável pelas permissões da API (app.js)
const bodyParser = require("body-parser"); // Responsável por gerenciar a chegada dos dados da API com o front
const dados = require("./modulo/funcoes.js"); // Import do arquivo de funções

const PORT = process.PORT || 8080;

const app = express();

// Configuração de permissões
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*"); //Servidor de origem da API
  response.header("Access-Control-Allow-Methods", "GET"); //Verbos permitidos na API
  //Carrega as configurações no CORS da API
  app.use(cors());
  //Próximo. Carregar os próximos endpoints
  next();
});

//ENDPOINTS

// Request >>> chegada de dados na API
app.get("/v1/usuarios", (request, response) => {
  let usuarios = dados.listarTodosUsuarios();
  response.status(usuarios.status_code).json(usuarios);
}); //usar sempre a versão e nome do projeto no endpoint

app.get("/v1/usuario/:usuario", (request, response) => {
  let usuario = request.params.usuario,
    status = dados.listarDadosDaConta(usuario);
  response.status(status.status_code).json(status);
});

app.get("/v1/contato/:contato", (request, response) => {
  let contato = request.params.contato,
    status = dados.listarDadosDeContato(contato);
  response.status(status.status_code).json(status);
});

app.get("/v1/mensagens/:usuario", (request, response) => {
  let mensagens = request.params.usuario,
    status = dados.listarTodasMensagens(mensagens);
  response.status(status.status_code).json(status);
});

app.get("/v1/busca/mensagens/:usuario/:contato", (request, response) => {
  let usuario = request.params.usuario,
    contato = request.params.contato,
    status = dados.listarConversasComUmContato(usuario, contato);
  response.status(status.status_code).json(status);
});

app.get("/v1/busca/:usuario/:query", (request, response) => {
  let usuario = request.params.usuario,
    palavraChave = request.params.query,
    status = dados.pesquisarPorPalavraChave(usuario, palavraChave);
  response.status(status.status_code).json(status);
});

// Start na API
app.listen(PORT, () => {
  console.log("API aguardando requisições em: http://127.0.0.1:8080/v1/");
});
