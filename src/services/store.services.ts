import {
  getAllProjects,
  getProjectById,
  saveProject,
  updateProject,
  deleteProject,
} from "../store/project.store";
import { generateUniqueId } from "../utils/idGenerator.utils";
import { Project, ConversationContent } from "../types";

const projectService = {
  getAll: () => {
    return getAllProjects();
  },

  getById: (id: string) => {
    const project = getProjectById(id);
    if (!project) throw new Error(`Project ${id} not found`);
    return project;
  },

  create: (name: string, path: string): Project => {
    // Lógica que el store no tiene:
    if (!name || !path) throw new Error("Name and path are required");
    const project: Project = {
      id: generateUniqueId(), // genera el id
      name,
      path,
      createdAt: Date.now(), // timestamp actual
      conversation: [], // historial vacío
    };
    saveProject(project);
    return project; // devuelve el proyecto creado
  },

  addMessage: (
    id: string,
    role: "user" | "model",
    content: string,
  ): Project => {
    const project = getProjectById(id);
    if (!project) throw new Error(`Project ${id} not found`);

    const message: ConversationContent = {
      role,
      content,
      timestamp: Date.now(),
    };

    project.conversation.push(message);
    updateProject(project);
    return project;
  },

  remove: (id: string): void => {
    const project = getProjectById(id);
    if (!project) throw new Error(`Project ${id} not found`);
    deleteProject(id);
  },
};
export { projectService };
