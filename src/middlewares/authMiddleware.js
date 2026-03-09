const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.JWT_SECRET || "secret-key-jitterbit-challenge";
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id; // Anexa o id no req
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
