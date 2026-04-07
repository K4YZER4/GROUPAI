import "dotenv/config"; //import dotenv to load environment variables
import express, { Request, Response } from "express"; //import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";
import fs from "fs"; //import fs to read files
import { geminiRouter } from "./routes/gemini.routes";
console.log(process.env.GEMINI_API_KEY);
//dotenv.config(); //load environment variables from .env <file></file>
const app = express(); //create an instance of express
app.use(express.json()); //use express.json() middleware to parse JSON request bodies
app.use("/api", geminiRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!"); //send a response to the client
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Hola papu");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000"); //start the server and listen on port 3000
});
