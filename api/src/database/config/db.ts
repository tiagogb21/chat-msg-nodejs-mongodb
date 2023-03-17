import mongoose, { ConnectOptions } from "mongoose";
import Logger from "../../utils/Logger";

interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const logger = new Logger();

const { DB_URI, MAX_RETRIES, RETRY_INTERVAL_MS } = process.env;

const connectToDatabase = async (retryCount = 0) => {
  if (!DB_URI) {
    throw new Error("A URI do banco de dados não foi definida.");
  }

  const options: MyConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    wtimeoutMS: 10000,
  };

  try {
    await mongoose.connect(DB_URI, options);
    logger.log(
      "info",
      "Conexão com o banco de dados estabelecida com sucesso."
    );
  } catch (error) {
    console.error(`Falha ao conectar com o banco de dados: ${error}`);

    if (retryCount < +MAX_RETRIES) {
      logger.log(
        "info",
        `Tentando se reconectar em ${+RETRY_INTERVAL_MS / 1000} segundos...`
      );
      setTimeout(async () => {
        await connectToDatabase(retryCount + 1);
      }, +RETRY_INTERVAL_MS);
    } else {
      console.error(
        "error",
        `Não foi possível se conectar após ${MAX_RETRIES} tentativas.`
      );
    }
  }
};

export default connectToDatabase;
