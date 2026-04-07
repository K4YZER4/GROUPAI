const timeStamp = new Date().toISOString(); //get the current timestamp
const logger = {
  log: (message: string) => {
    console.log(`${timeStamp}-message: ${message}`);
  },
  error: (message: string) => {
    console.error(`${timeStamp}-error: ${message}`);
  },
  warn: (message: string) => {
    console.warn(`${timeStamp}-warn: ${message}`);
  },
};

export { logger };
