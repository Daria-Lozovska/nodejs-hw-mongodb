import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './server.js';

dotenv.config();

const { PORT = 3000, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  });

