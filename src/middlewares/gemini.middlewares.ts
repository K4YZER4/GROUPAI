import { Request, Response, NextFunction } from "express";
const validateParam = (req: Request, res: Response, next: NextFunction) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  next();
};
export { validateParam };
