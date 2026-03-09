const db = require("./database");

async function initDb() {
  try {
    // Criar tabela Orders (Baseado nas especificações contendo numeroPedido string como id)
    await db.query(`
            CREATE TABLE IF NOT EXISTS Orders (
                orderId VARCHAR(50) PRIMARY KEY,
                value DECIMAL(10,2) NOT NULL,
                creationDate DATETIME NOT NULL
            );
        `);

    // Criar tabela Items com FK
    await db.query(`
            CREATE TABLE IF NOT EXISTS Items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                orderId VARCHAR(50) NOT NULL,
                productId INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE
            );
        `);

    // Criar tabela Users para Autenticação Real
    await db.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `);

    // Inserir ou atualizar um usuário inicial padrão admin/admin123
    // Hash de 'admin123' usando bcrypt (10 rounds): $2b$10$gryqRRvjiteaomYcN1l.gOKzTFs0d2V59FU1wtYrcEm.7uYGZT8C6
    await db.query(`
            INSERT INTO Users (username, password)
            VALUES ('admin', '$2b$10$gryqRRvjiteaomYcN1l.gOKzTFs0d2V59FU1wtYrcEm.7uYGZT8C6')
            ON DUPLICATE KEY UPDATE password = VALUES(password)
        `);

    console.log(
      "✅ Tabelas do banco de dados verificadas/criadas com sucesso.",
    );
  } catch (error) {
    console.error(" Erro ao inicializar o banco de dados:", error);
  }
}

module.exports = initDb;
