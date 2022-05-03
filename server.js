import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
// import { logger } from './src/log/logger.js';
import { Logger } from './src/log/logger.js';
import { userRouter } from './src/router/user-router.js';
import { authRouter } from './src/router/auth-router.js';
import { resHandler } from './src/utils/response-handler.js';
import { errorHandler } from './src/utils/error-handler.js';
const logger = new Logger('server.js');
const { PORT, MDB_URL } = process.env;

mongoose.connect(MDB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => logger.error(error));
db.once('open', () => logger.info('Connected to Database'));

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(resHandler);
app.use(errorHandler);

app.listen(PORT, () => logger.info('Server started'));
