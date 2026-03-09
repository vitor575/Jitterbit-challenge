const Order = require("../models/Order");
const Item = require("../models/Item");

const orderController = {
  // Criar um novo pedido
  createOrder: async (req, res, next) => {
    try {
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      if (!dataCriacao || isNaN(new Date(dataCriacao).getTime())) {
        return res.status(400).json({ message: "Data de criação inválida." });
      }

      // Validar e formatar a data
      // Formato para MySQL: 'YYYY-MM-DD HH:MM:SS'
      const parsedDate = new Date(dataCriacao);
      const mysqlDate = parsedDate.toISOString().slice(0, 19).replace("T", " ");

      // Transforma o payload
      const mappedItems = Array.isArray(items)
        ? items.map((item) => ({
            productId: parseInt(item.idItem),
            quantity: parseInt(item.quantidadeItem),
            price: parseFloat(item.valorItem),
          }))
        : [];

      const inputOrder = {
        orderId: numeroPedido,
        value: parseFloat(valorTotal),
        creationDate: mysqlDate,
        items: mappedItems,
      };

      // Salva no banco de dados
      await Order.create(inputOrder);

      // retorno
      const outputJSON = {
        orderId: inputOrder.orderId,
        value: inputOrder.value,
        creationDate: parsedDate.toISOString(),
        items: inputOrder.items,
      };

      return res.status(201).json(outputJSON);
    } catch (error) {
      // Se der duplicate entry ou outro erro
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Pedido já existe (orderId duplicado)." });
      }
      next(error);
    }
  },

  // Obter os dados do pedido pelo orderId
  getOrderById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      const items = await Item.findByOrderId(id);

      // Monta o payload
      const responseData = {
        orderId: order.orderId,
        value: parseFloat(order.value),
        creationDate: new Date(order.creationDate).toISOString(),
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
      };

      return res.json(responseData);
    } catch (error) {
      next(error);
    }
  },

  // Listar todos os pedidos
  listOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAllWithItems();

      const resultList = orders.map((order) => ({
        orderId: order.orderId,
        value: parseFloat(order.value),
        creationDate: new Date(order.creationDate).toISOString(),
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
      }));

      return res.json(resultList);
    } catch (error) {
      next(error);
    }
  },

  // Atualizar o pedido
  updateOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      if (!dataCriacao || isNaN(new Date(dataCriacao).getTime())) {
        return res.status(400).json({ message: "Data de criação inválida." });
      }

      // Transforma o payload
      const parsedDate = new Date(dataCriacao);
      const mysqlDate = parsedDate.toISOString().slice(0, 19).replace("T", " ");

      const mappedItems = Array.isArray(items)
        ? items.map((item) => ({
            productId: parseInt(item.idItem),
            quantity: parseInt(item.quantidadeItem),
            price: parseFloat(item.valorItem),
          }))
        : [];

      const updateData = {
        value: parseFloat(valorTotal),
        creationDate: mysqlDate,
        items: mappedItems,
      };

      // Apesar do param id e numeroPedido poderem diferir, valido e mantenho o ID do param
      await Order.update(id, updateData);

      return res.status(200).json({
        message: "Pedido atualizado com sucesso.",
        orderId: id,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete o pedido
  deleteOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const affectedRows = await Order.delete(id);

      if (affectedRows === 0) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      return res.status(200).json({ message: "Pedido deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
