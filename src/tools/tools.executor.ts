import {
  createFile,
  deleteFile,
  readFile,
  renameFile,
  logger,
  executeCommand,
} from "../utils"; //import file operation functions and logger

const executeTool = async (
  toolName: string,
  content: Record<string, string>,
): Promise<string> => {
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
    case "executeCommand":
      const result = executeCommand(content.command);
      return `Command executed: ${content.command}\nOutput: ${result}`;
    default:
      return `Tool ${toolName} not recognized.`;
  }
};
export { executeTool };
