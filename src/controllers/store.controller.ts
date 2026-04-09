import { Request, Response } from "express";
import { projectService } from "../services/store.services";
const projectController = {
  getAll: (req: Request, res: Response) => {
    try {
      const projects = projectService.getAll();
      res.json(projects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching projects." });
    }
  },
  getById: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = projectService.getById(id as string);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error in getById:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the project." });
    }
  },
  create: (req: Request, res: Response) => {
    try {
      const { path, name } = req.body;
      const newProject = projectService.create(name, path);
      res.status(201).json(newProject);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the project." });
    }
  },
  addMessage: (req: Request, res: Response) => {
    const { id } = req.params;
    const { role, content } = req.body;
    try {
      const updatedProject = projectService.addMessage(
        id as string,
        role,
        content,
      );
      res.json(updatedProject);
    } catch (error) {
      console.error("Error in addMessage:", error);
      res
        .status(404)
        .json({ error: "Error occurred while adding message to the project." });
    }
  },
  remove: (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      projectService.remove(id as string);
      res.status(204).send();
    } catch (error) {
      console.error("Error in remove:", error);
      res.status(404).json({ error: "Project not found" });
    }
  },
};
export { projectController };
