import { Router } from "express";
import {
  validateProject,
  validateId,
  validateAddMessage,
} from "../middlewares/store.middlewares";
import { projectController } from "../controllers/store.controller";

const routerStore = Router();
routerStore.get("/projects", projectController.getAll);
routerStore.get("/projects/:id", validateId, projectController.getById);
routerStore.post("/projects", validateProject, projectController.create);
routerStore.post(
  "/projects/:id/messages",
  validateAddMessage,
  projectController.addMessage,
);
routerStore.delete("/projects/:id", validateId, projectController.remove);

export { routerStore };
