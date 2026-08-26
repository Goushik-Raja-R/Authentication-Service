import express from 'express';
const app = express();
import router from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import helmet from 'helmet';
import { limiter } from './middlewares/rateLimit.middleware.js';
import { requestLogger, generateRequestID } from './middlewares/reqLogger.js';
app.use(generateRequestID);
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: '10kb' }));
app.use('/api/v1', router);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map