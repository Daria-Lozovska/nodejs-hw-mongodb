import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
