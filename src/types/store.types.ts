interface conversationContent {
  role: "user" | "model";
  content: string;
  timestamp: number;
}
interface project {
  id: string;
  name: string;
  path: string;
  createdAt: number;
  conversation: conversationContent[];
}
interface projectStore {
  allProjects: project[];
}
export type { project, conversationContent, projectStore };
