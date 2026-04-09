import { Request, Response, NextFunction } from "express";

const validateProject = (req: Request, res: Response, next: NextFunction) => {
  const { path, name } = req.body;
  if (!path || !name) {
    return res.status(400).json({ error: "Project data is required" });
  }
  next();
};
const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Project ID is required" });
  }
  next(); // Indica que la validación fue exitosa
};
const validateAddMessage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { role, content } = req.body;
  if (!id || !role || !content) {
    return res
      .status(400)
      .json({ error: "Project ID, role and content are required" });
  }
  if (role !== "user" && role !== "model") {
    return res.status(400).json({ error: "Role must be 'user' or 'model'" });
  }
  next(); // Indica que la validación fue exitosa
};

export { validateProject, validateId, validateAddMessage };
