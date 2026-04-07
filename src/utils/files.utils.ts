import fs from "fs"; //import fs to read files
const createFile = (name: string, content: string) => {
  fs.writeFileSync(name, content);
};
const deleteFile = (name: string) => {
  fs.unlinkSync(name);
};
const renameFile = (oldName: string, newName: string) => {
  fs.renameSync(oldName, newName);
};
const readFile = (name: string): string => {
  return fs.readFileSync(name, "utf-8");
};
export { createFile, deleteFile, renameFile, readFile };
