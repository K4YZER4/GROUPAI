// src/tools/file.tools.ts

export const fileToolsDeclarations = [
  {
    name: "createFile",
    description:
      "Creates a new file with the given name and content. If the file already exists, it overwrites it.",
    parameters: {
      type: "OBJECT",
      properties: {
        name: {
          type: "STRING",
          description:
            "The file name including its extension. Example: main.py, index.ts",
        },
        content: {
          type: "STRING",
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
      type: "OBJECT",
      properties: {
        name: {
          type: "STRING",
          description: "The name of the file to read. Example: main.py",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "deleteFile",
    description: "Permanently deletes a file from the filesystem.",
    parameters: {
      type: "OBJECT",
      properties: {
        name: {
          type: "STRING",
          description: "The name of the file to delete. Example: old_script.py",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "renameFile",
    description: "Renames an existing file or moves it to a new path.",
    parameters: {
      type: "OBJECT",
      properties: {
        oldName: {
          type: "STRING",
          description: "The current name of the file. Example: draft.py",
        },
        newName: {
          type: "STRING",
          description: "The new name for the file. Example: final.py",
        },
      },
      required: ["oldName", "newName"],
    },
  },
];
