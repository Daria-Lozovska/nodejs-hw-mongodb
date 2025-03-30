const { setupServer } = require('./server.js');
const { initMongoConnection } = require('./db/initMongoConnection.js');

const startApp = async () => {
  await initMongoConnection();
  setupServer();
};

startApp();
