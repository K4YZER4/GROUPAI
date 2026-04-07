import { FunctionDeclaration, Type } from "@google/genai";

const bashToolsDeclarations: FunctionDeclaration[] = [
  {
    name: "executeCommand",
    description: `Ejecuta un comando en la terminal del sistema operativo.
    Usa este tool para: navegar directorios (cd), listar archivos (ls/dir), 
    crear carpetas (mkdir), mover archivos (mv/move), instalar dependencias 
    (npm install), correr scripts, y cualquier otro comando de terminal.
    El directorio de trabajo persiste entre llamadas.`,
    parameters: {
      type: Type.OBJECT,
      properties: {
        command: {
          type: Type.STRING,
          description: `El comando completo a ejecutar. Ejemplos:
          - "ls -la"
          - "cd src"
          - "mkdir carpeta"
          - "npm install express"
          - "cat archivo.ts"`,
        },
      },
      required: ["command"],
    },
  },
];

export { bashToolsDeclarations };
