import { Type, FunctionDeclaration } from "@google/genai"; // ← agregar este import
export const fileToolsDeclarations: FunctionDeclaration[] = [
  {
    name: "createFile",
    description: "Creates a new file or overwrites it if it already exists.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description:
            "The file name including its extension. Example: main.py",
        },
        content: {
          type: Type.STRING,
          description: "The full content to write inside the file.",
        },
      },
      required: ["name", "content"],
    },
  },
  {
    name: "readFile",
    description: "Reads and returns the content of an existing file.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The name of the file to read.",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "deleteFile",
    description: "Permanently deletes a file from the filesystem.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The name of the file to delete.",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "renameFile",
    description: "Renames an existing file or moves it to a new path.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        oldName: {
          type: Type.STRING,
          description: "The current name of the file.",
        },
        newName: {
          type: Type.STRING,
          description: "The new name for the file.",
        },
      },
      required: ["oldName", "newName"],
    },
  },
];
