import { promises as fs } from "fs";
import path from "path";

const logsDir = path.resolve("logs");

class Logger {
  private logFilePath: string;

  constructor() {
    // Set the log file path with a timestamp in its name to avoid overwriting logs
    this.logFilePath = path.join(logsDir, `logs-${this.getTimestamp()}.log`);
    // Ensure the logs directory exists (create if not)
    this.ensureLogsDir();
  }

  // Create the logs directory recursively if it doesn't exist
  private async ensureLogsDir() {
    try {
      await fs.mkdir(logsDir, { recursive: true });
    } catch (err) {
      console.error("[Logger] Failed to create logs directory:", err);
    }
  }

  // Generate a timestamp string safe for filenames (colons replaced with dashes)
  private getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, "-");
  }

  // Append a log entry to the file asynchronously
  private async log(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    try {
      await fs.appendFile(this.logFilePath, logEntry, "utf8");
    } catch (err) {
      console.error("[Logger] Failed to write log:", err);
    }
  }

  // Convenience method for info level logs
  async info(message: any) {
    await this.log("info", message);
  }

  // Convenience method for warning level logs
  async warn(message: any) {
    await this.log("warn", message);
  }

  // Convenience method for error level logs
  async error(message: any) {
    await this.log("error", message);
  }
}

// Export a singleton logger instance
const logger = new Logger();
export default logger;
