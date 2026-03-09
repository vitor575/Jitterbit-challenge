const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const authController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username e Password são obrigatórios" });
      }

      // Consulta no banco de dados real
      const user = await User.findByUsername(username);

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Validação do password com Bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Dados corretos -> Gera o token
      const secret = process.env.JWT_SECRET;
      if (!secret && process.env.NODE_ENV === "production") {
        throw new Error("JWT_SECRET não definido no ambiente de produção.");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        secret || "secret-key-jitterbit-challenge",
        { expiresIn: "1d" },
      );

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
