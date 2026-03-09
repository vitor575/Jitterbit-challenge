exports.index = (req, res) => {
  res.json({
    message: "Bem-vindo à API!",
    status: "Instância operando normalmente.",
    timestamp: new Date(),
  });
};
