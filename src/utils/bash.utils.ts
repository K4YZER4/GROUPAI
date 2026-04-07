import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
let currentDir = process.cwd();

const executeCommand = async (command: string): Promise<string> => {
  // cd es un cambio de estado
  if (command.startsWith("cd ")) {
    const path = require("path");
    const target = command.slice(3).trim();
    const newDir = path.resolve(currentDir, target);
    currentDir = newDir;
    return `Directorio cambiado a: ${currentDir}`;
  }

  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: currentDir,
      timeout: 10000,
      maxBuffer: 1024 * 512,
    });

    // stderr
    if (stderr && !stdout) return stderr;
    return stdout || "Comando ejecutado sin output";
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
};

export { executeCommand, currentDir };
