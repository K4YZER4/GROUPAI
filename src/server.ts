import express, { Request, Response } from "express"; //import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv"; //import dotenv to load environment variables
import fs from "fs"; //import fs to read files
dotenv.config(); //load environment variables from .env <file></file>
const app = express(); //create an instance of express
app.use(express.json()); //use express.json() middleware to parse JSON request bodies
fs.writeFileSync("test.txt", "This is a test fileeeeeeeeeeeeeeeee."); //create a test file with some content
fs.renameSync("test.txt", "test2.txt"); //rename the test file
fs.unlinkSync("test2.txt"); //delete the test file
//console.log(process.env.GEMINI_API_KEY); //log the API key to the console
const createFile = async function (name: string, content: string) {
  fs.writeFileSync(name, content);
};
interface GeminiResponse {
  name: string;
  content: string;
}
const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //create an instance of GoogleGenAI
app.post("/gemini", async (req: Request, res: Response) => {
  const description = req.body.description; //get the description from the request body
  const response = await geminiAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Crea una función en Python que ${description}. Devuélveme solo un JSON (sin markdowns, sin explicaciones) con este formato: {"name": "nombre_del_archivo", "content": "código o contenido del archivo"}`,
  });
  const raw = response.text
    ? response.text.replace(/```json|```/g, "").trim()
    : "";
  const data = JSON.parse(raw); //send the response from Gemini AI to the client
  createFile(data.name, data.content);
  res.send(data); //create a file with the name and content from the Gemini AI response
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!"); //send a response to the client
});

app.listen(3000, () => {
  console.log("Server is running on port 3000"); //start the server and listen on port 3000
});
