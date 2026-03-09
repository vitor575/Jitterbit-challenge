require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.use(errorHandler);

module.exports = app;
