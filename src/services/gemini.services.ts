import { createFile, deleteFile, readFile, renameFile, logger } from "../utils";
import { fileToolsDeclarations, executeTool } from "../tools";
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
        systemInstruction: `Eres un agente que ejecuta tareas en el sistema de archivos.
            REGLAS:
            - Cuando el usuario pida crear un archivo, SIEMPRE usa la tool createFile. Nunca devuelvas el contenido como texto.
            - Cuando el usuario pida leer un archivo, SIEMPRE usa la tool readFile.
            - Cuando el usuario pida eliminar un archivo, SIEMPRE usa la tool deleteFile.
            - Confirma brevemente cuando termines.`,
        tools: [{ functionDeclarations: fileToolsDeclarations }],
      },
    });

    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];

    // ¿Gemini quiere llamar una tool?
    const toolCall = parts.find((p: any) => p.functionCall);

    if (toolCall && toolCall.functionCall && toolCall.functionCall.name) {
      const name = toolCall.functionCall.name;
      const args = (toolCall.functionCall.args ?? {}) as Record<string, string>;
      const result = executeTool(name, args);
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
