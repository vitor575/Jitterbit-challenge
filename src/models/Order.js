const db = require("../config/database");

const Order = {
  // Buscar todos os pedidos
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM Orders");
    return rows;
  },

  // Buscar um pedido pelo ID
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM Orders WHERE orderId = ?", [
      id,
    ]);
    return rows[0];
  },

  // Criar um pedido e seus itens associados (Transaction)
  create: async (orderData) => {
    const { orderId, value, creationDate, items } = orderData;
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        "INSERT INTO Orders (orderId, value, creationDate) VALUES (?, ?, ?)",
        [orderId, value, creationDate],
      );

      if (items && items.length > 0) {
        const itemsValues = items.map((item) => [
          orderId,
          item.productId,
          item.quantity,
          item.price,
        ]);

        await connection.query(
          "INSERT INTO Items (orderId, productId, quantity, price) VALUES ?",
          [itemsValues],
        );
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Atualizar pedido
  update: async (id, orderData) => {
    const { value, creationDate, items } = orderData;
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        "UPDATE Orders SET value = ?, creationDate = ? WHERE orderId = ?",
        [value, creationDate, id],
      );

      if (items) {
        await connection.query("DELETE FROM Items WHERE orderId = ?", [id]);

        if (items.length > 0) {
          const itemsValues = items.map((item) => [
            id,
            item.productId,
            item.quantity,
            item.price,
          ]);

          await connection.query(
            "INSERT INTO Items (orderId, productId, quantity, price) VALUES ?",
            [itemsValues],
          );
        }
      }

      await connection.commit();
      return id;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Deletar pedido
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM Orders WHERE orderId = ?", [
      id,
    ]);
    return result.affectedRows;
  },

  // Buscar todos os pedidos com seus itens
  findAllWithItems: async () => {
    const [orders] = await db.query("SELECT * FROM Orders");
    if (orders.length === 0) return [];

    const [items] = await db.query("SELECT * FROM Items");

    // Agrupar itens por orderId
    const itemsByOrder = items.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = [];
      }
      acc[item.orderId].push(item);
      return acc;
    }, {});

    // Combinar ordens e seus respectivos itens
    return orders.map((order) => ({
      ...order,
      items: itemsByOrder[order.orderId] || [],
    }));
  },
};

module.exports = Order;
