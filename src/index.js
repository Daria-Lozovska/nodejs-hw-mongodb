import {startServer} from "./server.js";
import {initMongoCollection} from "./db/initMongoConnection.js";

await initMongoCollection();

startServer();