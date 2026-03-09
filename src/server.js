const app = require("./app");
const http = require("http");
require("./config/database"); // Inicializa a conexão com o banco
const initDb = require("./config/initDb");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
  });
});
