import app from "./server.js";
import {initMongoCollection} from "./db/initMongoConnection.js";

await initMongoCollection();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});