import express from 'express';
const app = express();
import router from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

app.use(express.json());

app.use('/api/v1',router);

app.use(errorHandler);


export default app;