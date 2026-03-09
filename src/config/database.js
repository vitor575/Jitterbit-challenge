const mysql = require("mysql2/promise");

// pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false, // Necessário para conectar ao Aiven e bancos em nuvem
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Teste inicial de conexão ao instanciar o pool
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Conectado ao banco de dados MySQL com sucesso!");
    connection.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  });

module.exports = pool;
