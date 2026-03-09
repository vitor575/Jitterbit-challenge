const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const orderRoutes = require("./orderRoutes");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realizar login e obter Token JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido retornando o token
 */
router.post("/login", authController.login);

router.get("/", homeController.index);

router.use("/order", orderRoutes);

module.exports = router;
