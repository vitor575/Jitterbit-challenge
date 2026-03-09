const db = require("../config/database");

const Item = {
  //método para buscar todos os itens de um pedido específico
  findByOrderId: async (orderId) => {
    const [rows] = await db.query("SELECT * FROM Items WHERE orderId = ?", [
      orderId,
    ]);
    return rows;
  },
  //método para adicionar itens a um pedido
  create: async (itemData) => {
    const { orderId, productId, quantity, price } = itemData;
    const [result] = await db.query(
      "INSERT INTO Items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price],
    );
    return result.insertId; // Caso haja um ID incremental, senão retorna o status da operação
  },
};

module.exports = Item;
