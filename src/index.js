import { initMongoCollection } from "./db/initMongoConnection.js";
import { startServer } from "./server.js"; 

const startApp = async () => {
  await initMongoCollection();
  startServer();
};

startApp();
