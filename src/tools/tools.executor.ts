import { createFile, deleteFile, readFile, renameFile, logger } from "../utils"; //import file operation functions and logger

const executeTool = (
  toolName: string,
  content: Record<string, string>,
): string => {
  logger.log(`Executing tool: ${toolName}`);
  switch (toolName) {
    case "createFile":
      createFile(content.name, content.content);
      return `File ${content.name} created successfully.`;
    case "deleteFile":
      deleteFile(content.name);
      return `File ${content.name} deleted successfully.`;
    case "renameFile":
      renameFile(content.oldName, content.newName);
      return `File ${content.oldName} renamed to ${content.newName} successfully.`;
    case "readFile":
      const fileContent = readFile(content.name);
      return `Content of ${content.name}: ${fileContent}`;
    default:
      return `Tool ${toolName} not recognized.`;
  }
};
export { executeTool };
