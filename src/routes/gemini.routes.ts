import { Router } from "express";
import { geminiController } from "../controllers/gemini.controller";
import { validateParam } from "../middlewares";
const router = Router();
router.post("/gemini", validateParam, geminiController);
export { router as geminiRouter };
