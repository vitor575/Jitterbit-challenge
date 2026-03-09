const db = require("../config/database");

const Item = {
  //método para buscar todos os itens de um pedido específico
  findByOrderId: async (orderId) => {
    const [rows] = await db.query("SELECT * FROM Items WHERE orderId = ?", [
      orderId,
    ]);
    return rows;
  },
};

module.exports = Item;
