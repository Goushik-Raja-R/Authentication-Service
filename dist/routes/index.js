import { Router } from "express";
import authrouter from "./auth.routes.js";
const router = Router();
router.use('/auth', authrouter);
export default router;
//# sourceMappingURL=index.js.map