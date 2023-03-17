import "dotenv/config";

import app from "./app";
import connectToDatabase from "./database/config/db";
import Logger from "./utils/Logger";

const logger = new Logger();

const port = process.env.PORT || 8080;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Running server on port: ${port}`);
      logger.log("info", `Running server on port: ${port}`);
    });
  })
  .catch((error) => {
    logger.log("error", "A conexão com o banco de dados gerou um erro: \r\n");
    logger.log("error", error);
    logger.log("error", "\r\n Inicialização do servidor cancelada");
    process.exit(0);
  });
