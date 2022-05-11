import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Logger } from './src/log/logger.js';
import { userRouter } from './src/router/user-router.js';
import { authRouter } from './src/router/auth-router.js';
import { resHandler } from './src/utils/response-handler.js';
import { errorHandler } from './src/utils/error-handler.js';

config();

const logger = new Logger('server.js');
const { PORT, MDB_URL } = process.env;
const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(resHandler);
app.use(errorHandler);

mongoose.connect(
  MDB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (error) => {
    if (error) {
      logger.error(error);
      return;
    }
    logger.info('Connected to Database');
    app.listen(PORT || 3001, () => logger.info('Server started'));
  }
);
