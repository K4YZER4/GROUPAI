interface ConversationContent {
  role: "user" | "model";
  content: string;
  timestamp: number;
}
interface Project {
  id: string;
  name: string;
  path: string;
  createdAt: number;
  conversation: ConversationContent[];
}
interface ProjectStore {
  allProjects: Project[];
}
export type { Project, ConversationContent, ProjectStore };
