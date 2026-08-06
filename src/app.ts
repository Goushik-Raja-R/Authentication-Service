import express from 'express';
const app = express();
import router from './routes/index.js';

app.use(express.json());

app.use('/api/v1',router);


export default app;