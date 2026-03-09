const db = require("../config/database");

const Order = {
  // método para buscar todos os pedidos
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM `Order`");
    return rows;
  },

  // para buscar um pedido pelo ID
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM `Order` WHERE orderId = ?", [
      id,
    ]);
    return rows[0];
  },

  // método para criar um pedido
  create: async (orderData) => {
    const { value, creationDate } = orderData;
    const [result] = await db.query(
      "INSERT INTO `Order` (value, creationDate) VALUES (?, ?)",
      [value, creationDate],
    );
    return result.insertId; // Retorna o ID gerado
  },
};

module.exports = Order;
