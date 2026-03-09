const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Exige autenticação JWT para todas as operações de Order
router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemPayload:
 *       type: object
 *       properties:
 *         idItem:
 *           type: string
 *           example: "2434"
 *         quantidadeItem:
 *           type: integer
 *           example: 1
 *         valorItem:
 *           type: number
 *           example: 1000
 *     OrderPayload:
 *       type: object
 *       properties:
 *         numeroPedido:
 *           type: string
 *           example: "v10089015vdb-01"
 *         valorTotal:
 *           type: number
 *           example: 10000
 *         dataCriacao:
 *           type: string
 *           example: "2023-07-19T12:24:11.5299601+00:00"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemPayload'
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       201:
 *         description: Pedido criado
 *       409:
 *         description: Pedido já existe
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /api/order/list:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/list", orderController.listOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Obter pedido pelo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do pedido
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/:id", orderController.getOrderById);

/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     summary: Atualizar pedido pelo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       200:
 *         description: Atualizado com sucesso
 */
router.put("/:id", orderController.updateOrder);

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Deletar pedido pelo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletado com sucesso
 */
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
