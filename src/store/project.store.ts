// store/project.store.ts
import fs from "fs";
import path from "path";
import { Project, ProjectStore } from "../types/store.types";

const DB_PATH = path.join(process.cwd(), "data", "projects.json");

// --- Helpers privados ---

const readStore = (): ProjectStore => {
  if (!fs.existsSync(DB_PATH)) {
    return { allProjects: [] };
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as ProjectStore;
};

const writeStore = (store: ProjectStore): void => {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2), "utf-8");
};

// --- Operaciones públicas ---

const getAllProjects = (): Project[] => {
  return readStore().allProjects;
};

const getProjectById = (id: string): Project | undefined => {
  return readStore().allProjects.find((p) => p.id === id);
};

const saveProject = (project: Project): void => {
  const store = readStore();
  store.allProjects.push(project);
  writeStore(store);
};

const updateProject = (updated: Project): void => {
  const store = readStore();
  store.allProjects = store.allProjects.map((p) =>
    p.id === updated.id ? updated : p,
  );
  writeStore(store);
};

const deleteProject = (id: string): void => {
  const store = readStore();
  store.allProjects = store.allProjects.filter((p) => p.id !== id);
  writeStore(store);
};

export {
  getAllProjects,
  getProjectById,
  saveProject,
  updateProject,
  deleteProject,
};
