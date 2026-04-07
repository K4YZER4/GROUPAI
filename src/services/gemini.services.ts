import { createFile, deleteFile, readFile, renameFile, logger } from "../utils";
import { allTools, executeTool } from "../tools";
import { GoogleGenAI } from "@google/genai";
console.log(process.env.GEMINI_API_KEY);
const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //create an instance of GoogleGenAI
const callGemini = async (prompt: string): Promise<string> => {
  const contents: any[] = [{ role: "user", parts: [{ text: prompt }] }];

  // Loop: sigue hasta que Gemini termine (no pida más tools)
  while (true) {
    const response = await geminiAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: `Eres un agente que ejecuta tareas en el sistema de archivos y terminal.
          REGLAS:
          - Para crear archivos usa createFile.
          - Para leer archivos usa readFile.
          - Para eliminar archivos usa deleteFile.
          - Para renombrar archivos usa renameFile.
          - Para cualquier comando de terminal (ls, mkdir, cd, npm install, etc.) usa executeCommand.
          - Nunca devuelvas código o resultados como texto. Siempre usa las tools.
          - Confirma brevemente cuando termines.`,
        tools: [{ functionDeclarations: allTools }],
      },
    });

    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];

    // ¿Gemini quiere llamar una tool?
    const toolCall = parts.find((p: any) => p.functionCall);

    if (toolCall && toolCall.functionCall && toolCall.functionCall.name) {
      const name = toolCall.functionCall.name;
      const args = (toolCall.functionCall.args ?? {}) as Record<string, string>;
      const result = await executeTool(name, args);
      contents.push(candidate?.content);
      contents.push({
        role: "tool", // ← correcto
        parts: [{ functionResponse: { name, response: { output: result } } }],
      });

      // Vuelve al inicio del loop — Gemini decide si necesita más tools
    } else {
      // Gemini terminó — devuelve el texto final
      const text = parts.find((p: any) => p.text)?.text ?? "Done";
      logger.log("Gemini finished");
      return text;
    }
  }
};
export { callGemini };
