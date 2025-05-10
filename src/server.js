import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import contactsRouter from './routes/contacts.js'; 

dotenv.config();

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Редірект з кореня на /contacts
  app.get('/', (req, res) => {
    res.redirect('/contacts');
  });

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
