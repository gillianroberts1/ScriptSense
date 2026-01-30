import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, "copilot.log.md");

/**
 * Logs a prompt to copilot.log.md if it starts with "LOG PROMPT".
 * @param {string} prompt - The prompt text to log.
 */

export function logPrompt(prompt) {
  if (!prompt.startsWith("LOG PROMPT")) return;

  const logEntry = `\n## ${new Date().toLocaleString()}\n\n**Prompt:**\n${prompt}\n`;
  let logContent = "";

  if (fs.existsSync(LOG_FILE)) {
    logContent = fs.readFileSync(LOG_FILE, "utf8");
  }

  logContent += logEntry;
  fs.writeFileSync(LOG_FILE, logContent, "utf8");
  console.log("Prompt logged to copilot.log.md");
}
