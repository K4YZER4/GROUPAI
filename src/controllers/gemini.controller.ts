import { Request, Response } from "express";
import { callGemini } from "../services/gemini.services";
const geminiController = async (req: Request, res: Response) => {
  try {
    const prompt = req.body.prompt;
    const result = await callGemini(prompt);
    res.json({ result });
  } catch (error) {
    console.error("Error in geminiController:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
export { geminiController };
