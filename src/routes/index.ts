import {Router} from 'express'
import authrouter  from "./auth.routes.js";
import healthrouter from "./health.routes.js";

const router = Router();

router.use("/api/auth",authrouter);
router.use("/api/health",healthrouter);

export default router;